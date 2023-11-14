/*
  Warnings:

  - You are about to drop the column `signedfile` on the `Acts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[signedDocumentId]` on the table `Acts` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Acts" DROP COLUMN "signedfile",
ADD COLUMN     "signedDocumentId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Acts_signedDocumentId_key" ON "Acts"("signedDocumentId");

-- AddForeignKey
ALTER TABLE "Acts" ADD CONSTRAINT "Acts_signedDocumentId_fkey" FOREIGN KEY ("signedDocumentId") REFERENCES "SignedDocuments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
