import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable React unescaped entities rule for French text (apostrophes and quotes)
      "react/no-unescaped-entities": "off",
      // Warn instead of error for any types (critical for production)
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];

export default eslintConfig;
