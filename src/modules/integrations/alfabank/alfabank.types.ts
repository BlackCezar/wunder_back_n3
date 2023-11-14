export type AlfaRatesList = {
    rates: AlfaRate[];
};

export type AlfaRate = {
    sellRate: number;
    sellIso: string;
    sellCode: number;
    buyRate: number;
    buyIso: string;
    buyCode: number;
    quantity: number;
    name: string;
    date: string;
};

export type Token = {
    access_token: string;
    refresh_token: string;
    scope: string;
    token_type: string;
    expires_in: number;
};

export type RequirementsResult = {
    totalRowCount: number;
    page: Requirement[];
};
export type Requirement = {
    id: string;
    date: string;
    numb: string;
    type: number;
    typeName: string;
    status: number;
    statusName: string;
    number: string;
    corrName: string;
    corrUnp: string;
    corrNumber: string;
    corrBic: string;
    corrBank: string;
    amount: number;
    restAmount: number;
    currIso: string;
};
