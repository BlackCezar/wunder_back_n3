import {
    BadRequestException,
    Injectable,
    Logger,
    UnprocessableEntityException,
} from "@nestjs/common";
import {
    CreatePFTaskData,
    CreatePFTaskResult,
    ICreatePFPayload,
    PFGetTaskResult,
    PFResponseError,
} from "./planfix.types";

@Injectable()
export class PlanFixTransport {
    private readonly baseURL = "https://wunder-digital.planfix.ru/rest/task/";
    private readonly apiToken = process.env.PLAN_FIX_API_TOKEN;
    private readonly taskTemplateId = Number(process.env.PF_TASK_TEMPLATE);
    private readonly logger = new Logger(PlanFixTransport.name);

    public async getTask(id: string) {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.apiToken}`,
        };

        const response = await fetch(
            `${this.baseURL}/${id}?fields=status,assigner,counterparty,project,parent`,
            {
                headers,
            }
        );

        if (response.status === 200) {
            const responseData: PFGetTaskResult = await response.json();
            this.logger.verbose("Получена задача из Planfix: " + id);

            return responseData.task;
        } else if (response.status === 400) {
            const responseData: PFResponseError = await response.json();
            this.logger.error("Получение задачи в PlanFix провалено ");
            this.logger.debug(responseData);

            throw new BadRequestException(responseData.error);
        } else throw new UnprocessableEntityException(response.statusText);
    }

    public async completePFTask(taskId: number, status?: number) {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.apiToken}`,
        };

        const data = {
            status: {
                id: status ? status : 3,
            },
        };
        const response = await fetch(this.baseURL + taskId, {
            method: "POST",
            body: JSON.stringify(data),
            headers,
        });

        if (response.status === 200) {
            const responseData: PFGetTaskResult = await response.json();
            this.logger.verbose("Задача закрыта в PlanFix: " + taskId);

            return responseData.task;
        } else if (response.status === 400) {
            const responseData: PFResponseError = await response.json();
            this.logger.error("Завершение задачи в PlanFix провалено ");
            this.logger.debug(responseData);

            throw new BadRequestException(responseData.error);
        } else throw new UnprocessableEntityException(response.statusText);
    }

    public async createPFTask(payload: ICreatePFPayload) {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.apiToken}`,
        };

        let data: CreatePFTaskData = {
            template: { id: Number(this.taskTemplateId) },
            name: payload.title,
            description: payload.description,
            status: { id: 2 },
            project: {
                id: payload.projectId,
            },
        };
        if (payload.counterparty)
            data.counterparty = { id: payload.counterparty };
        if (payload.managerId) {
            data.assigner = { id: payload.managerId };
            data.assignees = { users: [{ id: payload.managerId }] };
        }
        if (payload.parentTaskId) data.parent = { id: payload.parentTaskId };

        this.logger.log("Создание задачи в PlanFix");
        this.logger.debug(data);

        const response = await fetch(this.baseURL, {
            body: JSON.stringify(data),
            method: "post",
            headers,
        });
        if (response.status === 201) {
            const responseData: CreatePFTaskResult = await response.json();
            this.logger.verbose(
                "ID созданной задачи в Planfix " + responseData.id
            );

            return responseData.id;
        } else if (response.status === 400) {
            const responseData: PFResponseError = await response.json();
            this.logger.error("Создание задачи в PlanFix провалено ");
            this.logger.debug(responseData);

            throw new BadRequestException(responseData.error);
        } else throw new UnprocessableEntityException(response.statusText);
    }
}
