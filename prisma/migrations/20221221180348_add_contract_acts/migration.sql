-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "contractId" INTEGER;

-- AlterTable
ALTER TABLE "CustomerCandidate" ALTER COLUMN "region" SET DEFAULT E'BY';

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Acts" ADD CONSTRAINT "Acts_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE CASCADE ON UPDATE CASCADE;
