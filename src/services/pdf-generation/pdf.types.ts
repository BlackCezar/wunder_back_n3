import { IInvoiceLine } from "../../modules/invoices/entity/invoice.entity";

export type ExtendedInvoiceLines = (IInvoiceLine & {
    totalVat: number;
    type: string;
    vat: number;
    total: number;
})[];
