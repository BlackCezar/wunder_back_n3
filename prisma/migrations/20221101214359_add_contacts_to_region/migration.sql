/*
  Warnings:

  - You are about to drop the column `settingsId` on the `Contacts` table. All the data in the column will be lost.
  - You are about to drop the column `sign` on the `Settings` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[regionId]` on the table `Contacts` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Contacts" DROP CONSTRAINT "Contacts_settingsId_fkey";

-- DropIndex
DROP INDEX "Contacts_settingsId_key";

-- AlterTable
ALTER TABLE "Contacts" DROP COLUMN "settingsId",
ADD COLUMN     "regionId" INTEGER;

-- AlterTable
ALTER TABLE "Region" ADD COLUMN     "sign" TEXT;

-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "sign";

-- CreateIndex
CREATE UNIQUE INDEX "Contacts_regionId_key" ON "Contacts"("regionId");

-- AddForeignKey
ALTER TABLE "Contacts" ADD CONSTRAINT "Contacts_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE CASCADE ON UPDATE CASCADE;
