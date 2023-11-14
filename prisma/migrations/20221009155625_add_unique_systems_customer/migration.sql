/*
  Warnings:

  - A unique constraint covering the columns `[contractId,systemName]` on the table `CustomerToSystemSettings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CustomerToSystemSettings_contractId_systemName_key" ON "CustomerToSystemSettings"("contractId", "systemName");
