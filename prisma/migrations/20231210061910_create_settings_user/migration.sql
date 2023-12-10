-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "monthly_budget" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "color_theme" TEXT NOT NULL DEFAULT 'light',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
