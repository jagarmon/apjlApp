import { Work } from "../../works/models/work";
import { Invoice } from "../models/invoice";
import { Published } from "./published";
import { State } from "./state";

export class Draft extends State {

    public state = 'Borrador'

    public transition(): void {
        this.context.transitionTo(new Published());
    }

    public printPDF(rows: Object, iva: number, invoice: Invoice, work: Work): void {
        alert("No se puede imprimir una factura en Borrador, pásela a Publicado primero")
    }
}
