import { Module } from "@nestjs/common";
import { SchedulesService } from "./schedules.service";
import { RatesModule } from "../../modules/rates/rates.module";
import { PlanFixModule } from "../../modules/integrations/planfix/planfix.module";
import { TasksModule } from "../tasks/tasks.module";
import { AdvertisingModule } from "../../modules/integrations/advertising/advertising.module";
import { AlfaBankModule } from "../../modules/integrations/alfabank/payments.module";
import { EdinModule } from "../../modules/integrations/edin/edin.module";
import { InvoiceModule } from "../../modules/invoices/invoice.module";
import { UserModule } from "../../modules/users/user.module";
import { SettingsModule } from "../../modules/settings/settings.module";

@Module({
    imports: [
        EdinModule,
        AdvertisingModule,
        AlfaBankModule,
        RatesModule,
        PlanFixModule,
        TasksModule,
        InvoiceModule,
        UserModule,
        SettingsModule,
    ],
    providers: [SchedulesService],
})
export class SchedulesModule {}
