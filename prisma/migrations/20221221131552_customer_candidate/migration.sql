-- CreateTable
CREATE TABLE "CustomerCandidate" (
    "id" SERIAL NOT NULL,
    "region" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyTaxNumber" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "contactPhoneNumber" TEXT NOT NULL,
    "publicAgree" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CustomerCandidate_pkey" PRIMARY KEY ("id")
);
