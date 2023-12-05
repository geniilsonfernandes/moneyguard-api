-- CreateEnum
CREATE TYPE "expeses_type" AS ENUM ('INCOME', 'EXPENSE');

-- CreateEnum
CREATE TYPE "periodicity_mode" AS ENUM ('ONCE', 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "payment_mode" AS ENUM ('ALL', 'PARCEL');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expenses" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" "expeses_type" NOT NULL,
    "name" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "payment_mode" TEXT NOT NULL,
    "periodicity_mode" TEXT NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "period_dates" TIMESTAMP(3)[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Expenses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
