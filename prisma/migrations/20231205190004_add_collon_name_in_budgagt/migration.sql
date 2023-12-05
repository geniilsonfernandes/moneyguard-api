/*
  Warnings:

  - Added the required column `amount` to the `Budgets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Budgets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Budgets" ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "note" TEXT NOT NULL DEFAULT '';
