import { Module, forwardRef } from "@nestjs/common";
import { DocumentsController } from "./documents.controller";
import { DocumentsService } from "./documents.service";
import { RegionsModule } from "../regions/regions.module";
import { DocumentRepository } from "./document.repository";
import { ContractsModule } from "../contracts/contracts.module";

@Module({
    controllers: [DocumentsController],
    imports: [RegionsModule, forwardRef(() => ContractsModule)],
    providers: [DocumentsService, DocumentRepository],
    exports: [DocumentRepository],
})
export class DocumentsModule {}
