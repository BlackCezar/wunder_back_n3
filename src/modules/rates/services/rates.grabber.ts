import { PrismaService } from "../../../prisma/prisma.service";
import { HttpService } from "@nestjs/axios";
import { Rate } from "../entities/rate.entity";
import { SellRatesEntity } from "../entities/sell-rates.entity";
import { AlfaRatesList } from "../../integrations/alfabank/alfabank.types";
const jsdom = require("jsdom");
const { Injectable } = require("@nestjs/common");
const { JSDOM } = jsdom;


@Injectable()
export class RatesGrabber {
  private rates: Rate[];
  private list: any[];

  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService
  ) {}
  public async start(currency: string): Promise<SellRatesEntity> {
    if (currency === "BYN") {
      return await this.fetchAlfaRates();
    }

    await this.getPage();
    await this.setRates();
    return await this.storeRates(currency);
  }

  public async fetchAlfaRates(): Promise<SellRatesEntity> {
    const allRates = await this.httpService.axiosRef.get<AlfaRatesList>(
      "https://developerhub.alfabank.by:8273/partner/1.0.1/public/rates"
    );
    const bynList = allRates.data.rates.filter((item) => item.buyIso === "BYN");

    const rates = {
      sellRUB: 1,
      sellUSD: 1,
      sellEUR: 1,
    };

    for (const rate of bynList) {
      if (rate.sellIso === "RUB") rates.sellRUB = rate.sellRate;
      if (rate.sellIso === "USD") rates.sellUSD = rate.sellRate;
      if (rate.sellIso === "EUR") rates.sellEUR = rate.sellRate;
    }

    return rates;
  }

  private async getPage(): Promise<void> {
    const response = await this.httpService.axiosRef.get(
      "https://eubank.kz/exchange-rates/"
    );
    const currentPage = response.data;
    const dom = new JSDOM(currentPage);
    const wrapper = dom.window.document.querySelectorAll(
      ".exchanges-tabs-list__item"
    );
    if (wrapper) {
      const list = wrapper[2].querySelectorAll(".exchange__col:last-child tr");
      this.list = list;
    }
  }
  private async setRates(): Promise<void> {
    const list = [];
    for (const item of this.list) {
      const currency = item.querySelector(
        ".exchange-table__left-side .exchange-table__title"
      ).textContent;
      const value = item.querySelector(".exchange-table__value").textContent;
      list.push({ currency, value });
    }
    this.rates = list;
  }

  private async storeRates(currency: string): Promise<SellRatesEntity> {
    const usdRate = this.rates.find((r) => r.currency === "USD").value;
    const eurRate = this.rates.find((r) => r.currency === "EUR").value;
    const rubRate = this.rates.find((r) => r.currency === "RUB").value;

    await this.prisma.rates.create({
      data: {
        fromRate: currency,
        usdRate,
        eurRate,
        rubRate,
      },
    });

    return {
      sellUSD: parseFloat(usdRate),
      sellEUR: parseFloat(eurRate),
      sellRUB: parseFloat(rubRate)
    }
  }
}
