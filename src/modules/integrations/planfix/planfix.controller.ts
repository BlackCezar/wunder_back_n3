import { Body, Controller, Post } from "@nestjs/common";
import {
    ApiBearerAuth,
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { SignInError } from "../../auth/dtos/error.dto";
import { UnAuthorized } from "../../../common/schemas/unauthorized";
import { PlanFixToken, Token } from "../../auth/dtos/token.dto";
import { PlanFixService } from "./planfix.service";
import { PFTask } from "./entity/pf-task.entity";
import { Public } from "../../../common/decorators/public.decorator";

@Controller("plan-fix")
@ApiTags("PLAN FIX API")
export class PlanFixController {
    constructor(private readonly planFixService: PlanFixService) { }

    @Post("/generate-token")
    @ApiBearerAuth()
    @ApiForbiddenResponse({ type: SignInError })
    @ApiUnauthorizedResponse({ type: UnAuthorized })
    @ApiOkResponse({ type: PlanFixToken })
    @ApiOperation({
        summary: "Генерация токена plan-fix",
    })
    public async generatePlanFixToken(): Promise<PlanFixToken> {
        return this.planFixService.generateToken();
    }

    @Post("/task/close")
    @Public()
    @ApiOperation({
        summary: "Веб-хук на закрытие задач",
    })
    public async closePlanFixTask(@Body() data: PFTask): Promise<string> {
        console.log('[closePlanFixTask]', data.ID)
        const result = await this.planFixService.closeTask(data.ID);
        return result
            ? "Успешно"
            : "В процессе выполнения возникли ошибки, перепроверьте данные";
    }
}
