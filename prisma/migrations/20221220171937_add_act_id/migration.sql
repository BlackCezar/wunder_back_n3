/*
  Warnings:

  - You are about to drop the column `signedDocumentId` on the `Acts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[actId]` on the table `SignedDocuments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `actId` to the `SignedDocuments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Acts" DROP CONSTRAINT "Acts_signedDocumentId_fkey";

-- DropIndex
DROP INDEX "Acts_signedDocumentId_key";

-- AlterTable
ALTER TABLE "Acts" DROP COLUMN "signedDocumentId";

-- AlterTable
ALTER TABLE "SignedDocuments" ADD COLUMN     "actId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SignedDocuments_actId_key" ON "SignedDocuments"("actId");

-- AddForeignKey
ALTER TABLE "SignedDocuments" ADD CONSTRAINT "SignedDocuments_actId_fkey" FOREIGN KEY ("actId") REFERENCES "Acts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
