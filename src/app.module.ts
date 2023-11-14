import { MomentModule } from "@ccmos/nestjs-moment";
import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { ScheduleModule } from "@nestjs/schedule";
import { HelpersModule } from "./helpers/helpers.module";
import { AccountsModule } from "./modules/accounts/accounts.module";
import { AuthModule } from "./modules/auth/auth.module";
import { ContractsModule } from "./modules/contracts/contracts.module";
import { DocumentsModule } from "./modules/documents/documents.module";
import { AlfaBankModule } from "./modules/integrations/alfabank/payments.module";
import { EdinModule } from "./modules/integrations/edin/edin.module";
import { PlanFixModule } from "./modules/integrations/planfix/planfix.module";
import { InvoiceModule } from "./modules/invoices/invoice.module";
import { KnowledgeModule } from "./modules/knowledebase/knowledge.module";
import { RatesModule } from "./modules/rates/rates.module";
import { RegionsModule } from "./modules/regions/regions.module";
import { SettingsModule } from "./modules/settings/settings.module";
import { SystemModule } from "./modules/systems/systems.module";
import { UserModule } from "./modules/users/user.module";
import { PrismaModule } from "./prisma/prisma.module";
import { EmailModule } from "./services/email/email.module";
import { MailModule } from "./services/email/mail/mail.module";
import { MicroserviceModule } from "./services/microservice/microservice.module";
import { PdfModule } from "./services/pdf-generation/pdf.module";
import { SchedulesModule } from "./services/schedules/schedules.module";
import { TasksModule } from "./services/tasks/tasks.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ".env",
        }),
        CacheModule.register({
            ttl: 60 * 60, // время жизни кэша в секундах
        }),
        ScheduleModule.forRoot(),
        MomentModule.forRoot({
            tz: "Europe/Minsk",
        }),
        MailModule,
        EmailModule,
        PrismaModule,
        UserModule,
        AuthModule,
        SettingsModule,
        HelpersModule,
        PdfModule,
        SystemModule,
        RegionsModule,
        PlanFixModule,
        AccountsModule,
        DocumentsModule,
        InvoiceModule,
        ContractsModule,
        EventEmitterModule.forRoot({
            maxListeners: 25,
        }),
        KnowledgeModule,
        EdinModule,
        SchedulesModule,
        AlfaBankModule,
        RatesModule,
        MicroserviceModule,
        TasksModule,
    ],
    exports: [CacheModule],
    controllers: [],
    providers: [

    ],
})
export class AppModule { }
