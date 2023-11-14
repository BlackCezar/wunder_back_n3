/*
  Warnings:

  - You are about to drop the column `expireDate` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Document` table. All the data in the column will be lost.
  - Added the required column `expireDate` to the `Contract` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contract" ADD COLUMN     "expireDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "expireDate",
DROP COLUMN "startDate",
ADD COLUMN     "comment" TEXT;
