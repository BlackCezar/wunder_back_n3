-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "name" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "SignedDocuments" ADD COLUMN     "fileName" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "billId" INTEGER;
