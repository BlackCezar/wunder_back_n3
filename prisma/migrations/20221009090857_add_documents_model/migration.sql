/*
  Warnings:

  - You are about to drop the column `expireDate` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Contract` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contract" DROP COLUMN "expireDate",
DROP COLUMN "link",
DROP COLUMN "startDate";

-- AlterTable
ALTER TABLE "CustomerToSystemSettings" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "expireDate" TIMESTAMP(3) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contractId" INTEGER NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
