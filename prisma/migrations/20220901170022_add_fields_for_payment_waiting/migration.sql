-- AlterTable
ALTER TABLE "PaymentWaiting" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Settings" ADD COLUMN     "paimentWaitingHours" INTEGER NOT NULL DEFAULT 72;
