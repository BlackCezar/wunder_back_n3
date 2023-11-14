/*
  Warnings:

  - You are about to drop the column `contractType` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `settingsId` on the `Customer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_settingsId_fkey";

-- DropIndex
DROP INDEX "Customer_settingsId_key";

-- AlterTable
ALTER TABLE "Contract" ADD COLUMN     "contractService" TEXT,
ADD COLUMN     "contractType" "ContractType" NOT NULL DEFAULT E'STANDARD',
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "settingsId" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "contractType",
DROP COLUMN "settingsId";

-- AlterTable
ALTER TABLE "CustomerToSystemSettings" ADD COLUMN     "contractId" INTEGER;

-- AlterTable
ALTER TABLE "Settings" ADD COLUMN     "customerId" INTEGER;

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerToSystemSettings" ADD CONSTRAINT "CustomerToSystemSettings_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_settingsId_fkey" FOREIGN KEY ("settingsId") REFERENCES "Settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
