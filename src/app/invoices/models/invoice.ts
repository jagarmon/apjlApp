import { Work } from "../../works/models/work";

export interface Invoice {
    id: number,
    invoiceID: string;
    date: string;
    concept: string;
    prices: string;
    totalPrice: number;
    invoiceState: string;
    iva: number;
    work: Work;
}