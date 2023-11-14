-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_systemId_fkey";

-- DropForeignKey
ALTER TABLE "CustomerToSystemSettings" DROP CONSTRAINT "CustomerToSystemSettings_systemName_fkey";

-- DropForeignKey
ALTER TABLE "SystemSettings" DROP CONSTRAINT "SystemSettings_systemName_fkey";

-- AddForeignKey
ALTER TABLE "SystemSettings" ADD CONSTRAINT "SystemSettings_systemName_fkey" FOREIGN KEY ("systemName") REFERENCES "System"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerToSystemSettings" ADD CONSTRAINT "CustomerToSystemSettings_systemName_fkey" FOREIGN KEY ("systemName") REFERENCES "System"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_systemId_fkey" FOREIGN KEY ("systemId") REFERENCES "System"("id") ON DELETE CASCADE ON UPDATE CASCADE;
