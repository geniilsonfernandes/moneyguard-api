/*
  Warnings:

  - The values [DAILY,WEEKLY,YEARLY] on the enum `periodicity_mode` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "periodicity_mode_new" AS ENUM ('ONCE', 'MONTHLY', 'FIXED');
ALTER TABLE "Expenses" ALTER COLUMN "periodicity_mode" TYPE "periodicity_mode_new" USING ("periodicity_mode"::text::"periodicity_mode_new");
ALTER TYPE "periodicity_mode" RENAME TO "periodicity_mode_old";
ALTER TYPE "periodicity_mode_new" RENAME TO "periodicity_mode";
DROP TYPE "periodicity_mode_old";
COMMIT;

-- AlterTable
ALTER TABLE "Expenses" ALTER COLUMN "due_date" SET DATA TYPE TEXT,
ALTER COLUMN "period_dates" SET DATA TYPE TEXT[];
