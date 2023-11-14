/*
  Warnings:

  - You are about to drop the column `customerId` on the `SystemSettings` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SystemSettings" DROP CONSTRAINT "SystemSettings_customerId_fkey";

-- AlterTable
ALTER TABLE "SystemSettings" DROP COLUMN "customerId";

-- CreateTable
CREATE TABLE "CustomerToSystemSettings" (
    "id" SERIAL NOT NULL,
    "systemName" TEXT NOT NULL,
    "minSum" MONEY NOT NULL DEFAULT 0,
    "customerId" INTEGER,

    CONSTRAINT "CustomerToSystemSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomerToSystemSettings_customerId_systemName_key" ON "CustomerToSystemSettings"("customerId", "systemName");

-- AddForeignKey
ALTER TABLE "CustomerToSystemSettings" ADD CONSTRAINT "CustomerToSystemSettings_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerToSystemSettings" ADD CONSTRAINT "CustomerToSystemSettings_systemName_fkey" FOREIGN KEY ("systemName") REFERENCES "System"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
