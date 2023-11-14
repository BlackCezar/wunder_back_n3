/*
  Warnings:

  - You are about to drop the column `prepay` on the `Settings` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PayType" AS ENUM ('PREPAY', 'POSTPAY', 'EXPENSES');

-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "prepay",
ADD COLUMN     "payType" "PayType" NOT NULL DEFAULT E'PREPAY';
