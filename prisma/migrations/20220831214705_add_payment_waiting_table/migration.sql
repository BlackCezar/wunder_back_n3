/*
  Warnings:

  - A unique constraint covering the columns `[taskId]` on the table `Bill` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[taskId]` on the table `BillLine` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Task" (
    "id" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,
    "managerId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "PaymentWaiting" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "expireDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentWaiting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Task_id_key" ON "Task"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentWaiting_taskId_key" ON "PaymentWaiting"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "Bill_taskId_key" ON "Bill"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "BillLine_taskId_key" ON "BillLine"("taskId");

-- AddForeignKey
ALTER TABLE "BillLine" ADD CONSTRAINT "BillLine_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentWaiting" ADD CONSTRAINT "PaymentWaiting_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
