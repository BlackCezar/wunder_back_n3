-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "customerCandidateId" INTEGER,
ALTER COLUMN "customerId" DROP NOT NULL;
