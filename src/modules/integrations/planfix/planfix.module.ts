import { CacheModule } from "@nestjs/cache-manager";
import { forwardRef, Module } from "@nestjs/common";
import { PlanFixController } from "./planfix.controller";
import { PlanFixService } from "./planfix.service";
import { PlanFixTransport } from "./planfix.transport";
import { JwtModule } from "@nestjs/jwt";
import { AccountsModule } from "../../accounts/accounts.module";
import { RegionsModule } from "../../regions/regions.module";
import { EmailModule } from "../../../services/email/email.module";
import { UserModule } from "../../users/user.module";
import { SettingsModule } from "../../settings/settings.module";
import { TasksModule } from "../../../services/tasks/tasks.module";
import { AuthModule } from "../../auth/auth.module";
import { InvoiceModule } from "../../invoices/invoice.module";

@Module({
    imports: [
        CacheModule.register({
            ttl: 60 * 60, // время жизни кэша в секундах
        }),
        forwardRef(() => RegionsModule),
        forwardRef(() => EmailModule),
        forwardRef(() => UserModule),
        forwardRef(() => SettingsModule),
        forwardRef(() => TasksModule),
        forwardRef(() => AuthModule),
        forwardRef(() => InvoiceModule),
        JwtModule,
        forwardRef(() => AccountsModule),
    ],
    controllers: [PlanFixController],
    providers: [PlanFixTransport, PlanFixService],
    exports: [PlanFixService, PlanFixTransport],
})
export class PlanFixModule {}
