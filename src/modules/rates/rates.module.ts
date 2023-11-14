import { Module } from "@nestjs/common";
import { RatesService } from "./services/rates.service";
import { RatesController } from "./rates.controller";
import { RatesGrabber } from "./services/rates.grabber";
import { RegionsModule } from "../regions/regions.module";
import { HttpModule } from "@nestjs/axios";
import { RatesRepository } from "./rates.respository";

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
    }),
    RegionsModule,
  ],
  controllers: [RatesController],
  providers: [RatesService, RatesGrabber, RatesRepository],
  exports: [RatesService],
})
export class RatesModule {}
