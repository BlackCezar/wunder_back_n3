-- AlterTable
ALTER TABLE "Settings" ALTER COLUMN "planFixManagerId" SET DEFAULT '',
ALTER COLUMN "planFixManagerId" SET DATA TYPE TEXT,
ALTER COLUMN "financialManagerId" SET DEFAULT '',
ALTER COLUMN "financialManagerId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "managerId" SET DATA TYPE TEXT;
