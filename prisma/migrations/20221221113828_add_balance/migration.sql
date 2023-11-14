-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "balance" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
ADD COLUMN     "externalAccountId" TEXT,
ADD COLUMN     "externalAgency" TEXT,
ADD COLUMN     "externalClientId" TEXT,
ADD COLUMN     "externalRegion" TEXT;
