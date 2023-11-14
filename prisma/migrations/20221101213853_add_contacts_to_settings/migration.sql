-- AlterTable
ALTER TABLE "Settings" ADD COLUMN     "sign" TEXT;

-- CreateTable
CREATE TABLE "Contacts" (
    "id" SERIAL NOT NULL,
    "contactName" TEXT,
    "BIC" TEXT,
    "bankName" TEXT,
    "accountNumber" TEXT,
    "companyAddress" TEXT,
    "companyTaxNumber" TEXT,
    "companyName" TEXT NOT NULL,
    "settingsId" INTEGER,

    CONSTRAINT "Contacts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contacts_settingsId_key" ON "Contacts"("settingsId");

-- AddForeignKey
ALTER TABLE "Contacts" ADD CONSTRAINT "Contacts_settingsId_fkey" FOREIGN KEY ("settingsId") REFERENCES "Settings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
