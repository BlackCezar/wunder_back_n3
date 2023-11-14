/*
  Warnings:

  - You are about to drop the column `region` on the `CustomerCandidate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CustomerCandidate" DROP COLUMN "region",
ADD COLUMN     "regionName" TEXT NOT NULL DEFAULT 'BY';

-- AlterTable
ALTER TABLE "Settings" ADD COLUMN     "global" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_token_key" ON "RefreshToken"("token");

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
