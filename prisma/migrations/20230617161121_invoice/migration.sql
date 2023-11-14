-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('NEW', 'PAID', 'CANCELED', 'AVOIDED', 'WAITING', 'SIGNED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "InvoiceDocumentType" AS ENUM ('BILL', 'ACT', 'SIGNED_BILL', 'SIGNED_ACT');

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "status" "InvoiceStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "taskId" INTEGER,
    "contractId" INTEGER,
    "currency" TEXT NOT NULL DEFAULT 'BYN',
    "invoiceNumber" TEXT NOT NULL DEFAULT '0',
    "lines" JSONB NOT NULL,
    "cachedSystemSettings" JSONB NOT NULL,
    "isVisible" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceDocument" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "InvoiceDocumentType" NOT NULL,
    "invoiceId" INTEGER NOT NULL,

    CONSTRAINT "InvoiceDocument_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_taskId_key" ON "Invoice"("taskId");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceDocument" ADD CONSTRAINT "InvoiceDocument_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
