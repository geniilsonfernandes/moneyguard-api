/*
  Warnings:

  - Changed the type of `payment_mode` on the `Expenses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `periodicity_mode` on the `Expenses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Expenses" DROP COLUMN "payment_mode",
ADD COLUMN     "payment_mode" "payment_mode" NOT NULL,
DROP COLUMN "periodicity_mode",
ADD COLUMN     "periodicity_mode" "periodicity_mode" NOT NULL;
