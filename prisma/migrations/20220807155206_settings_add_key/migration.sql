/*
  Warnings:

  - A unique constraint covering the columns `[regionId,systemName]` on the table `SystemSettings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SystemSettings_regionId_systemName_key" ON "SystemSettings"("regionId", "systemName");
