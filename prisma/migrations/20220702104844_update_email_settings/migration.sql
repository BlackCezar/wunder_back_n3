/*
  Warnings:

  - You are about to drop the column `email` on the `EmailSettings` table. All the data in the column will be lost.
  - You are about to drop the column `host` on the `EmailSettings` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `EmailSettings` table. All the data in the column will be lost.
  - Added the required column `from` to the `EmailSettings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmailSettings" DROP COLUMN "email",
DROP COLUMN "host",
DROP COLUMN "password",
ADD COLUMN     "from" TEXT NOT NULL;
