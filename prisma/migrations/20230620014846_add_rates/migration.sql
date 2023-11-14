-- CreateTable
CREATE TABLE "InvoiceRates" (
    "id" SERIAL NOT NULL,
    "rubRate" TEXT NOT NULL DEFAULT '1',
    "eurRate" TEXT NOT NULL DEFAULT '1',
    "usdRate" TEXT NOT NULL DEFAULT '1',
    "invoiceId" INTEGER NOT NULL,

    CONSTRAINT "InvoiceRates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InvoiceRates_invoiceId_key" ON "InvoiceRates"("invoiceId");

-- AddForeignKey
ALTER TABLE "InvoiceRates" ADD CONSTRAINT "InvoiceRates_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
