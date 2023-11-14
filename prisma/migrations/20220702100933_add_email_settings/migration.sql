-- CreateTable
CREATE TABLE "EmailSettings" (
    "id" SERIAL NOT NULL,
    "regionName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "host" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "EmailSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailSettings_regionName_key" ON "EmailSettings"("regionName");

-- AddForeignKey
ALTER TABLE "EmailSettings" ADD CONSTRAINT "EmailSettings_regionName_fkey" FOREIGN KEY ("regionName") REFERENCES "Region"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
