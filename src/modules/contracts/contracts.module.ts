import { forwardRef, Module } from "@nestjs/common";
import { SettingsModule } from "../settings/settings.module";
import { UserModule } from "../users/user.module";
import { ContractsService } from "./contracts.service";
import { ContractsRepository } from "./contracts.repository";
import { ContractsController } from "./contracts.controller";
import { DocumentsModule } from "../documents/documents.module";

@Module({
    imports: [
        forwardRef(() => SettingsModule),
        forwardRef(() => UserModule),
        forwardRef(() => DocumentsModule),
    ],
    providers: [ContractsService, ContractsRepository],
    exports: [ContractsService, ContractsRepository],
    controllers: [ContractsController],
})
export class ContractsModule {}
