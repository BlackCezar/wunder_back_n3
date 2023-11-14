-- CreateTable
CREATE TABLE "BillLine" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "sum" MONEY NOT NULL,
    "accountId" INTEGER NOT NULL,
    "billId" INTEGER NOT NULL,

    CONSTRAINT "BillLine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bill" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Bill_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BillLine_taskId_key" ON "BillLine"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "Bill_taskId_key" ON "Bill"("taskId");

-- AddForeignKey
ALTER TABLE "BillLine" ADD CONSTRAINT "BillLine_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillLine" ADD CONSTRAINT "BillLine_billId_fkey" FOREIGN KEY ("billId") REFERENCES "Bill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
