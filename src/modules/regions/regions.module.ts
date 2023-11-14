import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MicroserviceModule } from "../../services/microservice/microservice.module";
import { SettingsModule } from "../settings/settings.module";
import { RegionsController } from "./regions.controller";
import { RegionsRepository } from "./regions.repository";
import { RegionsService } from "./regions.service";

@Module({
    imports: [forwardRef(() => SettingsModule), JwtModule, MicroserviceModule],
    providers: [RegionsService, RegionsRepository],
    controllers: [RegionsController],
    exports: [RegionsService, RegionsRepository],
})
export class RegionsModule {}
