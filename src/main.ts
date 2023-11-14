import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { RedocModule, RedocOptions } from "nestjs-redoc";
import { AppModule } from "./app.module";
import { PrismaService } from "./prisma/prisma.service";
import { AtGuard } from "./common/gards/at.gard";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { JWT_SECRET } from "./common/constants";

async function appStart() {
    // Init App
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors({
        origin: process.env.FRONTEND_PORT,
        credentials: true,
    });
    app.setGlobalPrefix("api");

    const reflector = new Reflector();
    const jwtService = app.get(JwtService)
    app.useGlobalGuards(new AtGuard(jwtService, reflector))
    app.useGlobalPipes(
        new ValidationPipe({
            exceptionFactory: (errors) => {
                const result = errors.map((err) => {
                    console.log(errors);
                    for (const prop in err.constraints) {
                        if (prop === "isEmail")
                            return `Невалидный формат email`;
                    }
                });
                return new BadRequestException(result);
            },
            stopAtFirstError: true,
        })
    );
    app.setViewEngine("ejs");

    // Set Prisma
    const prismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app);

    //   SET SWAGGER
    const config = new DocumentBuilder()
        .setTitle("Wunder Back API")
        .setVersion("2.0")
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    const redocOptions: RedocOptions = {
        title: "Wunder Back API",
    };
    // // //@ts-ignore
    await RedocModule.setup("/docs", app, document, redocOptions);

    // Start server
    const PORT = process.env.PORT || 5000;

    await app.listen(PORT, () =>
        console.log(`Server started on port = ${PORT}`)
    );
}
appStart();
