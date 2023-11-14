-- DropForeignKey
ALTER TABLE "BillLine" DROP CONSTRAINT "BillLine_taskId_fkey";

-- AddForeignKey
ALTER TABLE "BillLine" ADD CONSTRAINT "BillLine_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- DropIndex
DROP INDEX "BillLine_taskId_key";