"use server"

import { fileExists, getUserPreviewsDirectory, safePathJoin } from "@/lib/files"
import { User } from "@/prisma/client"
import fs from "fs/promises"
import path from "path"
import { exec } from "child_process"
import { promisify } from "util"
import sharp from "sharp"
import config from "../config"

const execAsync = promisify(exec)

export async function pdfToImages(user: User, origFilePath: string): Promise<{ contentType: string; pages: string[] }> {
  const userPreviewsDirectory = getUserPreviewsDirectory(user)
  await fs.mkdir(userPreviewsDirectory, { recursive: true })

  const basename = path.basename(origFilePath, path.extname(origFilePath))
  
  // Check if converted pages already exist
  const existingPages: string[] = []
  for (let i = 1; i <= config.upload.pdfs.maxPages; i++) {
    const convertedFilePath = safePathJoin(userPreviewsDirectory, `${basename}.${i}.webp`)
    if (await fileExists(convertedFilePath)) {
      existingPages.push(convertedFilePath)
    } else {
      break
    }
  }

  if (existingPages.length > 0) {
    return { contentType: "image/webp", pages: existingPages }
  }

  // Convert PDF pages to WebP using Ghostscript
  const tempDir = path.join(userPreviewsDirectory, `.temp_${basename}`)
  await fs.mkdir(tempDir, { recursive: true })

  try {
    const maxPages = config.upload.pdfs.maxPages
    const dpi = config.upload.pdfs.dpi
    const pngPattern = path.join(tempDir, `page-%d.png`)
    
    // Use Ghostscript to convert PDF pages to PNG
    // -dNOPAUSE: Don't pause after each page
    // -dBATCH: Exit after processing all pages
    // -sDEVICE=pngalpha: PNG with alpha channel
    // -r150: Resolution (DPI)
    // -dFirstPage/dLastPage: Page range
    const gsCommand = [
      "gs",
      "-dNOPAUSE",
      "-dBATCH",
      "-sDEVICE=pngalpha",
      `-r${dpi}`,
      `-dFIRSTPage=1`,
      `-dLASTPage=${maxPages}`,
      `-sOutputFile="${pngPattern}"`,
      `"${origFilePath}"`,
    ].join(" ")

    await execAsync(gsCommand, {
      maxBuffer: 256 * 1024 * 1024,
      timeout: 300000, // 5 minutes
    })

    // Convert PNG files to WebP and collect results
    const results: string[] = []
    for (let i = 1; i <= maxPages; i++) {
      const pngPath = path.join(tempDir, `page-${i}.png`)
      
      // Check if PNG exists
      if (!(await fileExists(pngPath))) {
        break
      }

      const webpPath = safePathJoin(userPreviewsDirectory, `${basename}.${i}.webp`)
      
      // Convert PNG to WebP using sharp
      await sharp(pngPath)
        .webp({
          quality: config.upload.pdfs.quality,
          alphaQuality: config.upload.pdfs.quality,
        })
        .resize(config.upload.pdfs.maxWidth, config.upload.pdfs.maxHeight, {
          fit: "inside",
          withoutEnlargement: true,
        })
        .toFile(webpPath)

      results.push(webpPath)
    }

    if (results.length === 0) {
      throw new Error("No pages were converted from PDF")
    }

    return {
      contentType: "image/webp",
      pages: results,
    }
  } catch (error) {
    console.error("Error converting PDF to image:", error)
    throw error
  } finally {
    // Cleanup temp directory
    try {
      await fs.rm(tempDir, { recursive: true, force: true })
    } catch (cleanupError) {
      console.warn("Failed to cleanup temp directory:", cleanupError)
    }
  }
}
