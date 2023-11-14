import { Module } from "@nestjs/common";
import { PdfService } from "./pdf.service";
import { SettingsModule } from "../../modules/settings/settings.module";
import { RegionsModule } from "../../modules/regions/regions.module";

@Module({
    imports: [SettingsModule, RegionsModule],
    providers: [PdfService],
    exports: [PdfService],
})
export class PdfModule {}
