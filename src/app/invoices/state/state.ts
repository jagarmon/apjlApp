import { Work } from "../../works/models/work";
import { Invoice } from "../models/invoice";
import { Context } from "./context";
export abstract class State {

    protected context: Context = {} as Context;

    public abstract state: string;

    public setContext(context: Context) {
        this.context = context;
    }

    public abstract transition(): void;

    public abstract printPDF(rows: Object, iva: number, invoice: Invoice, work: Work): boolean;
}