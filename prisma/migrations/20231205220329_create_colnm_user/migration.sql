/*
  Warnings:

  - A unique constraint covering the columns `[clerk_id]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerk_id` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "clerk_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Users_clerk_id_key" ON "Users"("clerk_id");
