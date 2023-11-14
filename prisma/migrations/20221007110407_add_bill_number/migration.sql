/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `Bill` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Bill" ADD COLUMN     "number" TEXT NOT NULL DEFAULT E'0';

-- CreateIndex
CREATE UNIQUE INDEX "Bill_number_key" ON "Bill"("number");
