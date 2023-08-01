import { Work } from "../../works/models/work";
import { Invoice } from "../models/invoice";
import { State } from "./state";

export class Context {
    
    private state: State = {} as State;

    constructor(state: State) {
        this.transitionTo(state);
    }

    /**
     * The Context allows changing the State object at runtime.
     */
    public transitionTo(state: State): void {
        this.state = state;
        this.state.setContext(this);
    }

    public getState(): string {        
       return this.state.state;
    }

    /**
     * The Context delegates part of its behavior to the current State object.
     */
    public transition(): void {
        this.state.transition();
    }

    public printPDF(rows: Object, iva: number, invoice: Invoice, work: Work): void {
        this.state.printPDF(rows, iva, invoice, work);
    }
}