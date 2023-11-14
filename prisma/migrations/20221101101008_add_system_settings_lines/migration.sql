-- CreateTable
CREATE TABLE "SysemSettingsLine" (
    "id" SERIAL NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "commission" INTEGER NOT NULL DEFAULT 0,
    "fromAmount" INTEGER NOT NULL,
    "toAmount" INTEGER NOT NULL,
    "systemSettingsId" INTEGER NOT NULL,

    CONSTRAINT "SysemSettingsLine_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SysemSettingsLine" ADD CONSTRAINT "SysemSettingsLine_systemSettingsId_fkey" FOREIGN KEY ("systemSettingsId") REFERENCES "SystemSettings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
