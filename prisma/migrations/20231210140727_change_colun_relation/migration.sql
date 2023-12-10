/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Settings` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "settings_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Settings_user_id_key" ON "Settings"("user_id");
