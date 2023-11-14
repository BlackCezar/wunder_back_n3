import {Module} from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { IntegrationsController } from './integrations.controller';
import {HttpModule} from "@nestjs/axios";
import {CacheModule} from "@nestjs/cache-manager";

@Module({
  imports: [HttpModule, CacheModule.register()],
  providers: [IntegrationsService],
  controllers: [IntegrationsController],
  exports: [IntegrationsService]
})
export class IntegrationsModule {}
