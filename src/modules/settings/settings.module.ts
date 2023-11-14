import { Module, forwardRef } from "@nestjs/common";
import { SettingsController } from "./settings.controller";
import { SettingsService } from "./settings.service";
import { SettingsRepository } from "./repositories/settings.repository";
import { SystemSettingsRepository } from "./repositories/system-settings.repository";
import { RegionsModule } from "../regions/regions.module";
import { ContractsModule } from "../contracts/contracts.module";

@Module({
    imports: [
        forwardRef(() => RegionsModule),
        forwardRef(() => ContractsModule),
    ],
    controllers: [SettingsController],
    providers: [SettingsService, SettingsRepository, SystemSettingsRepository],
    exports: [SettingsRepository, SystemSettingsRepository, SettingsService],
})
export class SettingsModule {}
