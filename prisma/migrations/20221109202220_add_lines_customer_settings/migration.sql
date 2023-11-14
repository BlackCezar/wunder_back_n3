-- CreateTable
CREATE TABLE "SysemSettingsCustomerLine" (
    "id" SERIAL NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "commission" INTEGER NOT NULL DEFAULT 0,
    "fromAmount" INTEGER NOT NULL,
    "toAmount" INTEGER NOT NULL,
    "systemSettingsId" INTEGER NOT NULL,

    CONSTRAINT "SysemSettingsCustomerLine_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SysemSettingsCustomerLine" ADD CONSTRAINT "SysemSettingsCustomerLine_systemSettingsId_fkey" FOREIGN KEY ("systemSettingsId") REFERENCES "CustomerToSystemSettings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
