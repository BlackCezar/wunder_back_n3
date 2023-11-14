-- CreateTable
CREATE TABLE "Contract" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "expireDate" TIMESTAMP(3) NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
