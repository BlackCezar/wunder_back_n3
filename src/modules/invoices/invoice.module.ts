import { forwardRef, Module } from "@nestjs/common";
import { PlanFixModule } from "../integrations/planfix/planfix.module";
import { InvoiceRepository } from "./repositories/invoice.repository";
import { InvoiceService } from "./invoice.service";
import { InvoiceController } from "./invoice.controller";
import { InvoiceDocumentRepository } from "./repositories/invoice-document.repository";
import { UserModule } from "../users/user.module";

@Module({
    imports: [forwardRef(() => PlanFixModule), forwardRef(() => UserModule)],
    providers: [InvoiceRepository, InvoiceService, InvoiceDocumentRepository],
    exports: [InvoiceRepository, InvoiceService, InvoiceDocumentRepository],
    controllers: [InvoiceController],
})
export class InvoiceModule {}
