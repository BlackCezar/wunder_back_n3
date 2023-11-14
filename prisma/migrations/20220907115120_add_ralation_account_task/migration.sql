/*
  Warnings:

  - A unique constraint covering the columns `[taskId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "taskId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Account_taskId_key" ON "Account"("taskId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;
