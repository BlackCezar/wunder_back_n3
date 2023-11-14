-- CreateTable
CREATE TABLE "BillSystemLine" (
    "id" SERIAL NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "billId" INTEGER NOT NULL,
    "commission" INTEGER NOT NULL DEFAULT 0,
    "fromAmount" INTEGER NOT NULL,
    "toAmount" INTEGER NOT NULL,

    CONSTRAINT "BillSystemLine_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BillSystemLine" ADD CONSTRAINT "BillSystemLine_billId_fkey" FOREIGN KEY ("billId") REFERENCES "Bill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
