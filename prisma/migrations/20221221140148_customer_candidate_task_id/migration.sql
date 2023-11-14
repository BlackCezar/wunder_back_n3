/*
  Warnings:

  - Added the required column `taskId` to the `CustomerCandidate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CustomerCandidate" ADD COLUMN     "taskId" INTEGER NOT NULL;
