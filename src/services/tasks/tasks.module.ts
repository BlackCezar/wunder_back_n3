import { forwardRef, Module } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TaskRepository } from "./repositories/tasks.repository";
import { SettingsModule } from "../../modules/settings/settings.module";
import { AccountsModule } from "../../modules/accounts/accounts.module";
import { UserModule } from "../../modules/users/user.module";
import { PlanFixModule } from "../../modules/integrations/planfix/planfix.module";
import { WaitingTaskRepository } from "./repositories/waiting-task.repository";

@Module({
    imports: [
        forwardRef(() => UserModule),
        forwardRef(() => SettingsModule),
        forwardRef(() => AccountsModule),
        forwardRef(() => PlanFixModule),
    ],
    providers: [TasksService, TaskRepository, WaitingTaskRepository],
    exports: [TasksService, TaskRepository, WaitingTaskRepository],
})
export class TasksModule {}
