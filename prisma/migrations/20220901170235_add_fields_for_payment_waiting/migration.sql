/*
  Warnings:

  - You are about to drop the column `paimentWaitingHours` on the `Settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "paimentWaitingHours",
ADD COLUMN     "paymentWaitingHours" INTEGER NOT NULL DEFAULT 72;
