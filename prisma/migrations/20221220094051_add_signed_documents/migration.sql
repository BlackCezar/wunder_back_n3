-- CreateEnum
CREATE TYPE "SignedDocumentsStatus" AS ENUM ('WAITING', 'SIGNED');

-- CreateTable
CREATE TABLE "SignedDocuments" (
    "id" SERIAL NOT NULL,
    "status" "SignedDocumentsStatus" NOT NULL,
    "fileLink" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "customerId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "SignedDocuments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SignedDocuments_taskId_key" ON "SignedDocuments"("taskId");

-- AddForeignKey
ALTER TABLE "SignedDocuments" ADD CONSTRAINT "SignedDocuments_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
