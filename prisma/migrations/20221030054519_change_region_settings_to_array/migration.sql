/*
  Warnings:

  - You are about to drop the column `settingsId` on the `Region` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[taskId]` on the table `BillLine` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Region" DROP CONSTRAINT "Region_settingsId_fkey";

-- DropIndex
DROP INDEX "Region_settingsId_key";

-- AlterTable
ALTER TABLE "Region" DROP COLUMN "settingsId";

-- AlterTable
ALTER TABLE "Settings" ADD COLUMN     "regionId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "BillLine_taskId_key" ON "BillLine"("taskId");

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE SET NULL ON UPDATE CASCADE;
