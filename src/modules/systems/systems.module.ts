import { Module } from "@nestjs/common";
import { SystemRepository } from "./system.repository";
import { SystemController } from "./system.controller";

@Module({
  controllers: [SystemController],
  providers: [SystemRepository],
  exports: [SystemRepository],
})
export class SystemModule {}
