/*
  Warnings:

  - You are about to drop the column `email` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `mobileNumber` on the `Customer` table. All the data in the column will be lost.
  - Added the required column `BIC` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bankAddress` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bankName` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyAddress` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyEmail` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyPhoneNumber` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyTaxNumber` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactEmail` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactName` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactPhoneNumber` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalAddress` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responsiblePersonFullName` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responsiblePersonPosition` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `signatureDocumentType` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "email",
DROP COLUMN "fullName",
DROP COLUMN "mobileNumber",
ADD COLUMN     "BIC" TEXT NOT NULL,
ADD COLUMN     "bankAddress" TEXT NOT NULL,
ADD COLUMN     "bankName" TEXT NOT NULL,
ADD COLUMN     "companyAddress" TEXT NOT NULL,
ADD COLUMN     "companyEmail" TEXT NOT NULL,
ADD COLUMN     "companyPhoneNumber" TEXT NOT NULL,
ADD COLUMN     "companyTaxNumber" TEXT NOT NULL,
ADD COLUMN     "contactEmail" TEXT NOT NULL,
ADD COLUMN     "contactName" TEXT NOT NULL,
ADD COLUMN     "contactPhoneNumber" TEXT NOT NULL,
ADD COLUMN     "postalAddress" TEXT NOT NULL,
ADD COLUMN     "responsiblePersonFullName" TEXT NOT NULL,
ADD COLUMN     "responsiblePersonPosition" TEXT NOT NULL,
ADD COLUMN     "signatureDocumentType" TEXT NOT NULL;
