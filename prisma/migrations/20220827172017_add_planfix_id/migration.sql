-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "planFixId" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Settings" ADD COLUMN     "planFixManagerId" INTEGER NOT NULL DEFAULT 0;
