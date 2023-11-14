/*
  Warnings:

  - Made the column `sign` on table `Region` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Region" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "sign" SET NOT NULL;
