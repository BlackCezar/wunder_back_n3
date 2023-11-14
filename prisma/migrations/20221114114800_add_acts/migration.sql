-- CreateTable
CREATE TABLE "Acts" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "billId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "Acts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Acts_billId_key" ON "Acts"("billId");

-- AddForeignKey
ALTER TABLE "Acts" ADD CONSTRAINT "Acts_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Acts" ADD CONSTRAINT "Acts_billId_fkey" FOREIGN KEY ("billId") REFERENCES "Bill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
