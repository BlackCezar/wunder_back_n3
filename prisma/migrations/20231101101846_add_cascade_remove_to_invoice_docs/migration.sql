-- DropForeignKey
ALTER TABLE "InvoiceDocument" DROP CONSTRAINT "InvoiceDocument_invoiceId_fkey";

-- DropForeignKey
ALTER TABLE "InvoiceRates" DROP CONSTRAINT "InvoiceRates_invoiceId_fkey";

-- AddForeignKey
ALTER TABLE "InvoiceRates" ADD CONSTRAINT "InvoiceRates_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceDocument" ADD CONSTRAINT "InvoiceDocument_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
