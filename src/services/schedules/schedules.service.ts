import { Injectable, Logger } from "@nestjs/common";
import { Cron, Interval } from "@nestjs/schedule";
import { EdinService } from "../../modules/integrations/edin/edin.service";
import { RatesService } from "../../modules/rates/services/rates.service";
import { WaitingTaskRepository } from "../tasks/repositories/waiting-task.repository";
import { PlanFixService } from "../../modules/integrations/planfix/planfix.service";
import { AdvertisingService } from "../../modules/integrations/advertising/advertising.service";
import { InvoiceRepository } from "../../modules/invoices/repositories/invoice.repository";
import { CustomerRepository } from "../../modules/users/repositories/customer.repository";
import { ICustomer } from "../../common/interfaces/user.interface";
import { SettingsRepository } from "../../modules/settings/repositories/settings.repository";
import { TaskRepository } from "../tasks/repositories/tasks.repository";
import { TaskType } from "../../common/types/taskType.enum";

@Injectable()
export class SchedulesService {
    private readonly logger = new Logger(SchedulesService.name);
    constructor(
        private edinService: EdinService,
        private advertisingService: AdvertisingService,
        private ratesService: RatesService,
        private readonly waitingTaskRepository: WaitingTaskRepository,
        private readonly planFixService: PlanFixService,
        private readonly invoiceRepository: InvoiceRepository,
        private readonly customerRepository: CustomerRepository,
        private readonly settingsRepository: SettingsRepository,
        private readonly taskRepository: TaskRepository
    ) {
        if (process.env.NODE_ENV === "production") {
            console.log("Update integrations state");
            this.updateIntegrationsState();
            this.edinResendFiles();
        }
    }

    @Interval(3.6e6)
    edinResendFiles() {
        this.logger.log("Start reSendWaitingDocuments");
        this.edinService.reSendWaitingDocuments();
    }

    @Interval(3.6e6)
    updateIntegrationsState() {
        this.advertisingService.updateState().then(() => {
            // this.integrationService.getMetaBalance('act_891347917944961')
            // this.integrationService.getGoogleAdsBalance('8354037283', '2640292372', '581898445')
        });
    }
    @Cron("0 30 13 * * *", {
        timeZone: "Asia/Almaty",
    })
    updateRates() {
        this.ratesService.fetch();
    }

    @Interval(60000 * 5)
    public async checkWaitingTasks() {
        const tasks = await this.waitingTaskRepository.getExpiredActiveTasks();

        for (const task of tasks) {
            console.log('[checkWaitingTask] task:', task)
            const invoice = await this.invoiceRepository.getById(
                task.task.parentId
            );
            if (!invoice) return;
            const customer = (await this.customerRepository.findById(
                invoice.customerId,
                {
                    id: true,
                    companyName: true,
                }
            )) as Pick<ICustomer, "id" | "companyName">;
            if (!customer) return;
            const settings = await this.settingsRepository.findOne({
                contractId: invoice.contractId,
            });

            const pfTaskId = await this.planFixService.createTopUpFailedTask(
                invoice,
                customer,
                task.task.managerId,
                settings.projectId
            );

            // const topUpTasks = await this.taskRepository.find({
            //     type: TaskType.ONE_ACCOUNT_TOP_UP,
            //     parentId: task.task.parentId,
            // });
            // await this.planFixService.cancelTasks(topUpTasks.map((t) => t.id));
            // await this.planFixService.cancelTasks([task.task.parentId]);
            // await this.waitingTaskRepository.setStatus(task.id, false);
        }
    }
}
