import { Controller, Get } from "@nestjs/common";
import { IntegrationsService } from "./integrations.service";

@Controller("integrations")
export class IntegrationsController {
  constructor(private integrationsService: IntegrationsService) {
    // this.getTestFetch()
  }

  async getTestFetch() {
    await this.integrationsService.updateState();
    const r = await this.integrationsService.getYandexDirectBalance(
      "BY",
      "by-paritetbank-wund-zachislen",
      "77038645"
    );
    console.log("TEST ", r);
  }
}
