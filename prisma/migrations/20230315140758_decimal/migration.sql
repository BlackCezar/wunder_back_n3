/*
  Warnings:

  - You are about to alter the column `fromAmount` on the `SysemSettingsLine` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `toAmount` on the `SysemSettingsLine` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE "BillSystemLine" ALTER COLUMN "fromAmount" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "toAmount" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "SysemSettingsCustomerLine" ALTER COLUMN "fromAmount" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "toAmount" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "SysemSettingsLine" ALTER COLUMN "fromAmount" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "toAmount" SET DATA TYPE DECIMAL(65,30);
