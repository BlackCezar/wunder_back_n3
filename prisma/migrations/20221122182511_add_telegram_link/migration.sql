-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "companyPhoneNumber" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Settings" ADD COLUMN     "telegramLink" TEXT NOT NULL DEFAULT E'';
