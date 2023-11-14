/*
  Warnings:

  - A unique constraint covering the columns `[settingsId]` on the table `Contract` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Settings" ADD COLUMN     "contractId" INTEGER;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Contract_settingsId_key" ON "Contract"("settingsId");
