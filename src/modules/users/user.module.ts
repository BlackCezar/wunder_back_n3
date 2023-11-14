import { Module, forwardRef } from "@nestjs/common";
import { UserRepository } from "./repositories/user.repository";
import { CustomerCandidateRepository } from "./repositories/customer-candidate.repository";
import { CustomerService } from "./services/customer.service";
import { CustomerRepository } from "./repositories/customer.repository";
import { CustomersController } from "./customers.controller";
import { EmailModule } from "../../services/email/email.module";
import { PrismaService } from "../../prisma/prisma.service";
import { ContractsModule } from "../contracts/contracts.module";
import { TasksModule } from "../../services/tasks/tasks.module";

@Module({
    imports: [
        forwardRef(() => EmailModule),
        forwardRef(() => ContractsModule),
        forwardRef(() => TasksModule),
    ],
    controllers: [CustomersController],
    providers: [
        PrismaService,
        UserRepository,
        CustomerCandidateRepository,
        CustomerService,
        CustomerRepository,
    ],
    exports: [
        UserRepository,
        CustomerCandidateRepository,
        CustomerService,
        CustomerRepository,
    ],
})
export class UserModule {}
