import { Injectable } from "@nestjs/common";
import { TaskPayload } from "../tasks.types";
import { PrismaService } from "../../../prisma/prisma.service";
import { ITask } from "../../../common/interfaces/task.interface";
import { Prisma } from "@prisma/client";

@Injectable()
export class TaskRepository {
    constructor(private readonly prisma: PrismaService) {}

    public async getTask(id: number): Promise<ITask> {
        return this.prisma.task.findUnique({
            where: {
                id,
            },
        });
    }

    public async appendNewTask(payload: TaskPayload): Promise<ITask> {
        const { id, customerId, customerCandidateId, managerId, type } =
            payload;

        const data: Prisma.TaskCreateInput = {
            id,
            type,
            managerId,
        };

        if (customerId)
            data.counterparty = {
                connect: {
                    id: customerId,
                },
            };

        if (customerCandidateId) data.customerCandidateId = customerCandidateId;

        return this.prisma.task.create({
            data,
        });
    }
}
