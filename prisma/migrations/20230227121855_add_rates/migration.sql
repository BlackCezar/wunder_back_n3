-- CreateTable
CREATE TABLE "Rates" (
    "id" SERIAL NOT NULL,
    "fromRate" TEXT NOT NULL,
    "usdRate" TEXT NOT NULL,
    "rubRate" TEXT NOT NULL,
    "eurRate" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rates_pkey" PRIMARY KEY ("id")
);
