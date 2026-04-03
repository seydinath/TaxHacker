-- CreateTable
CREATE TABLE "recurring_transactions" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "merchant" TEXT,
    "total" INTEGER,
    "currency_code" TEXT,
    "type" TEXT DEFAULT 'expense',
    "note" TEXT,
    "extra" JSONB,
    "category_code" TEXT,
    "project_code" TEXT,
    "recurrence_pattern" TEXT NOT NULL,
    "recurrence_interval" INTEGER NOT NULL DEFAULT 1,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "last_generated_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recurring_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "recurring_transactions_user_id_idx" ON "recurring_transactions"("user_id");

-- CreateIndex
CREATE INDEX "recurring_transactions_is_active_idx" ON "recurring_transactions"("is_active");

-- CreateIndex
CREATE INDEX "recurring_transactions_last_generated_date_idx" ON "recurring_transactions"("last_generated_date");

-- AddForeignKey
ALTER TABLE "recurring_transactions" ADD CONSTRAINT "recurring_transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recurring_transactions" ADD CONSTRAINT "recurring_transactions_category_code_user_id_fkey" FOREIGN KEY ("category_code", "user_id") REFERENCES "categories"("code", "user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recurring_transactions" ADD CONSTRAINT "recurring_transactions_project_code_user_id_fkey" FOREIGN KEY ("project_code", "user_id") REFERENCES "projects"("code", "user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
