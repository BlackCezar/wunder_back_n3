import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { RegionSettingEntity } from "./entities/region-settings.entity";
import { RegionSystemSettingsEntity } from "./entities/region-system-settings.entity";
import { SettingsService } from "./settings.service";
import { Public } from "../../common/decorators/public.decorator";

@ApiTags('SETTINGS API')
@Controller("settings")
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) {
    }

    @Public()
    @Get("global/systems")
    @ApiOperation({
        summary: 'Глобальные настройки систем активного региона',
    })
    @ApiOkResponse({ type: [RegionSystemSettingsEntity] })
    async getGlobalSystemSettings() {
        return this.settingsService.getGlobalSystemSettings();
    }

    @Get("global")
    @Public()
    @ApiOperation({
        summary: 'Глобальные настройки активного региона',
    })
    @ApiOkResponse({ type: RegionSettingEntity })
    async getGlobalSettings() {
        console.log('settingsService', this.settingsService)
        return this.settingsService.getGlobalSettings();
    }
}