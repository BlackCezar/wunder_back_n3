/*
  Warnings:

  - You are about to drop the column `sicret` on the `User` table. All the data in the column will be lost.
  - Added the required column `secret` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_sicret_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "sicret",
ADD COLUMN     "secret" VARCHAR(200) NOT NULL;
