/*
  Warnings:

  - You are about to drop the column `closedAmount` on the `Acts` table. All the data in the column will be lost.
  - You are about to drop the column `expenseAmount` on the `Acts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Acts" DROP COLUMN "closedAmount",
DROP COLUMN "expenseAmount";

-- AlterTable
ALTER TABLE "BillLine" ADD COLUMN     "expense" MONEY NOT NULL DEFAULT 0,
ADD COLUMN     "transfered" MONEY NOT NULL DEFAULT 0;
