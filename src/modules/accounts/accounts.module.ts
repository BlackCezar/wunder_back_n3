import { Module, forwardRef } from "@nestjs/common";
import { UserModule } from "../users/user.module";
import { PlanFixModule } from "../integrations/planfix/planfix.module";
import { SettingsModule } from "../settings/settings.module";
import { RegionsModule } from "../regions/regions.module";
import { ContractsModule } from "../contracts/contracts.module";
import { AccountsController } from "./accounts.controller";
import { AccountsService } from "./services/accounts.service";
import { AccountRepository } from "./account.repository";
import { SystemModule } from "../systems/systems.module";
import { TasksModule } from "../../services/tasks/tasks.module";
import { IntegrationsModule } from "../../integrations/integrations.module";
import { EmailModule } from "../../services/email/email.module";
import { AccountsTopUpService } from "./services/accounts-topup.service";
import { InvoiceModule } from "../invoices/invoice.module";

@Module({
    imports: [
        UserModule,
        forwardRef(() => PlanFixModule),
        SettingsModule,
        RegionsModule,
        ContractsModule,
        SystemModule,
        forwardRef(() => TasksModule),
        IntegrationsModule,
        EmailModule,
        InvoiceModule,
        forwardRef(() => UserModule),
    ],
    controllers: [AccountsController],
    providers: [AccountsService, AccountRepository, AccountsTopUpService],
    exports: [AccountsService, AccountRepository],
})
export class AccountsModule {}
