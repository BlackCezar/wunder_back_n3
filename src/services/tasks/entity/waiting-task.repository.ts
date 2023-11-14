import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { CreateWaitingTaskDto } from "../dto/create-waiting-task.dto";
import { TaskType } from "../../../common/types/taskType.enum";

@Injectable()
export class WaitingTaskRepository {
    constructor(private readonly prisma: PrismaService) {}

    public async createWaitingTask(
        data: Omit<CreateWaitingTaskDto, "paymentWaitingHours"> & {
            expireDate: Date;
            type: TaskType;
        }
    ) {
        await this.prisma.task.create({
            data: {
                customerId: data.customerId,
                type: data.type,
                id: data.id,
                managerId: data.managerId,
                parentId: data.parentId,
            },
        });

        return this.prisma.paymentWaiting.create({
            data: {
                task: {
                    connect: {
                        id: data.id,
                    },
                },
                isActive: true,
                expireDate: data.expireDate,
            },
        });
    }
}
