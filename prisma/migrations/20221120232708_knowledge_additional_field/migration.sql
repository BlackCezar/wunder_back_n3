-- DropForeignKey
ALTER TABLE "Knowledge" DROP CONSTRAINT "Knowledge_categoryID_fkey";

-- AlterTable
ALTER TABLE "Knowledge" ADD COLUMN     "toMain" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Knowledge" ADD CONSTRAINT "Knowledge_categoryID_fkey" FOREIGN KEY ("categoryID") REFERENCES "KnowledgeCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
