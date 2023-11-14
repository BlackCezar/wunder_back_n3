-- DropIndex
DROP INDEX "Bill_taskId_key";

-- DropIndex
DROP INDEX "BillLine_taskId_key";

-- AlterTable
ALTER TABLE "Bill" ALTER COLUMN "taskId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "BillLine" ALTER COLUMN "taskId" DROP NOT NULL;
