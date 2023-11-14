import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JWT_SECRET } from "../../common/constants";
import { EmailModule } from "../../services/email/email.module";
import { TasksModule } from "../../services/tasks/tasks.module";
import { ContractsModule } from "../contracts/contracts.module";
import { PlanFixModule } from "../integrations/planfix/planfix.module";
import { SettingsModule } from "../settings/settings.module";
import { UserModule } from "../users/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./services/auth.service";
import { HashService } from "./services/hash.service";
import { AtStrategy } from "./strategies/at.strategy";
import { RtStrategy } from "./strategies/rt.strategy";
import { APP_GUARD } from "@nestjs/core";
import { AtGuard } from "../../common/gards/at.gard";
import { RolesGuard } from "../../common/gards/roles.gard";

@Module({
    imports: [
        JwtModule.register({
            secret: JWT_SECRET,
            global: false,
        }),
        forwardRef(() => UserModule),
        EmailModule,
        forwardRef(() => TasksModule),
        SettingsModule,
        forwardRef(() => PlanFixModule),
        ContractsModule,
    ],
    controllers: [AuthController],
    providers: [AtGuard, RolesGuard, AuthService, AtStrategy, RtStrategy, HashService

    ],
    exports: [AuthService, HashService],
})
export class AuthModule { }
