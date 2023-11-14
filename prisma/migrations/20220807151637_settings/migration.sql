/*
  Warnings:

  - You are about to drop the `EmailSettings` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[settingsId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[settingsId]` on the table `Region` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `settingsId` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `settingsId` to the `Region` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ContractType" AS ENUM ('STANDARD', 'CUSTOM');

-- DropForeignKey
ALTER TABLE "EmailSettings" DROP CONSTRAINT "EmailSettings_regionName_fkey";

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "contractType" "ContractType" NOT NULL DEFAULT E'STANDARD',
ADD COLUMN     "settingsId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Region" ADD COLUMN     "settingsId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "EmailSettings";

-- CreateTable
CREATE TABLE "Settings" (
    "id" SERIAL NOT NULL,
    "emailFrom" TEXT NOT NULL DEFAULT E'Patform Wunder',
    "ratesAdds" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "freeHours" INTEGER NOT NULL DEFAULT 0,
    "freeTimes" INTEGER NOT NULL DEFAULT 0,
    "hourCost" MONEY NOT NULL DEFAULT 0,
    "vat" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "prepay" BOOLEAN NOT NULL DEFAULT true,
    "allowTransfer" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemSettings" (
    "id" SERIAL NOT NULL,
    "systemName" TEXT NOT NULL,
    "regionId" INTEGER,
    "minSum" MONEY NOT NULL DEFAULT 0,
    "customerId" INTEGER,

    CONSTRAINT "SystemSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_settingsId_key" ON "Customer"("settingsId");

-- CreateIndex
CREATE UNIQUE INDEX "Region_settingsId_key" ON "Region"("settingsId");

-- AddForeignKey
ALTER TABLE "Region" ADD CONSTRAINT "Region_settingsId_fkey" FOREIGN KEY ("settingsId") REFERENCES "Settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_settingsId_fkey" FOREIGN KEY ("settingsId") REFERENCES "Settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SystemSettings" ADD CONSTRAINT "SystemSettings_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SystemSettings" ADD CONSTRAINT "SystemSettings_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SystemSettings" ADD CONSTRAINT "SystemSettings_systemName_fkey" FOREIGN KEY ("systemName") REFERENCES "System"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
