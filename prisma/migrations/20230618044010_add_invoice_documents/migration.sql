/*
  Warnings:

  - You are about to drop the column `billId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `Acts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Bill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BillLine` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BillSystemLine` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SignedDocuments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Acts" DROP CONSTRAINT "Acts_billId_fkey";

-- DropForeignKey
ALTER TABLE "Acts" DROP CONSTRAINT "Acts_contractId_fkey";

-- DropForeignKey
ALTER TABLE "Acts" DROP CONSTRAINT "Acts_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Bill" DROP CONSTRAINT "Bill_contractId_fkey";

-- DropForeignKey
ALTER TABLE "Bill" DROP CONSTRAINT "Bill_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Bill" DROP CONSTRAINT "Bill_taskId_fkey";

-- DropForeignKey
ALTER TABLE "BillLine" DROP CONSTRAINT "BillLine_accountId_fkey";

-- DropForeignKey
ALTER TABLE "BillLine" DROP CONSTRAINT "BillLine_billId_fkey";

-- DropForeignKey
ALTER TABLE "BillLine" DROP CONSTRAINT "BillLine_taskId_fkey";

-- DropForeignKey
ALTER TABLE "BillSystemLine" DROP CONSTRAINT "BillSystemLine_billId_fkey";

-- DropForeignKey
ALTER TABLE "SignedDocuments" DROP CONSTRAINT "SignedDocuments_actId_fkey";

-- DropForeignKey
ALTER TABLE "SignedDocuments" DROP CONSTRAINT "SignedDocuments_taskId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "billId",
ADD COLUMN     "invoiceId" INTEGER;

-- DropTable
DROP TABLE "Acts";

-- DropTable
DROP TABLE "Bill";

-- DropTable
DROP TABLE "BillLine";

-- DropTable
DROP TABLE "BillSystemLine";

-- DropTable
DROP TABLE "SignedDocuments";
