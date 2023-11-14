/*
  Warnings:

  - A unique constraint covering the columns `[contractId]` on the table `Settings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Settings_contractId_key" ON "Settings"("contractId");
