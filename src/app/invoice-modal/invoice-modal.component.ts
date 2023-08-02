import { Component, Inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheck, faFileInvoice, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Work } from '../works/models/work';
import jspdf from 'jspdf';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from '../invoices/models/invoice';
import { Customer } from '../customers/models/customer';
import { CustomerService } from '../services/customer.service';
import { Context } from '../invoices/state/context';
import { Draft } from '../invoices/state/draft';
import { Published } from '../invoices/state/published';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../shared/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-invoice-modal',
  templateUrl: './invoice-modal.component.html',
  styleUrls: ['./invoice-modal.component.css']
})
//Crear nueva pagina, IVA mockeado, Introducir los datos del usuario que faltan, y los que estan meterlos en el formulario
export class InvoiceModalComponent {

  
  checkIcon=faCheck;
  cancelIcon=faXmark;
  invoiceIcon= faFileInvoice;

  settingsPressed: boolean = false;

  form = {} as FormGroup;
  
  work: any;

  invoice = {} as Invoice;

  selectedStates = [] as Customer[];

  customers= [] as Customer[];

  
  context = {} as Context;

  rows = [
    {
      concept: "",
      price: 0
    }];
  
  iva = new FormControl(10);
  ivaList: number[] = [21, 10, 5, 4, 0];

  ngOnInit(){
    this.customerService.findAll().subscribe(
      (data: Customer[]) => {
      if(data){
        this.customers = data;
        this.selectedStates = data;    
      } 
    })    
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public object: any,
    private _route: ActivatedRoute, 
    private _router: Router,
    private _invoiceService: InvoiceService,
    private customerService: CustomerService,
    public dialogRef: MatDialogRef<InvoiceModalComponent>,
    private _modalService: NgbModal
    ){
      if(object.data.invoiceID){
        this.invoice = object.data
        this.work = object.data.work
        this.settingsPressed = object.settingsPressed
        if(object.data.invoiceState === 'Borrador')
          this.context = new Context(new Draft());
        else if (object.data.invoiceState === 'Publicado')
          this.context = new Context(new Published());
      }
      else{ 
        this.work = object.data;
        this.settingsPressed = true;
      }
      this.rows = object.rows
  }

  closeClick(){
    this.dialogRef.close();
  }

  stateButtonClicked(){
    let message = "Publicado"
    if(this.invoice.invoiceState === "Publicado") message  = "Borrador"
    let modal = this.showConfirmationModal("¿Desea cambiar el estado de la factura?","La factura pasará a estado "+message)
    modal.result.then((result: any) => {
      if ( result === 'success' ) {
        this.changeState();
        this.invoice.invoiceState= this.context.getState()
      }else{
      }
    });   
    
  }

  addNewRow(){
    this.rows.push({
      concept: "",
      price: 0
    });
  }

  addPriceToText(doc: jspdf, text: string, priceArray: string[]): string[]{
    let splitText = doc.splitTextToSize(text, 130); //160   
    let stillPricesLeft=true
    let priceIterator = 0;
    for (var i = 0; i < splitText.length; i++) {
      if(stillPricesLeft){
        if(i>0){
          splitText[i-1] = this.fillTheLine(doc, splitText[i-1],priceArray[priceIterator])
          }
        else{
          splitText[i] = this.fillTheLine(doc, splitText[i],priceArray[priceIterator])
        }  
        priceIterator++;     
        stillPricesLeft = false;
      }
      if(splitText[i] == "--addedLineByRow--" && priceArray[priceIterator]){
        splitText.splice(i,1)
        stillPricesLeft = true;
      }
    }
  return splitText;
  }

  fillTheLine(doc:jspdf, line: string, price: string): string{
    let len = 145 - doc.getTextDimensions(line).w;
    let blankSpaces = "";
    if(doc.getTextDimensions(blankSpaces).w >= len) return line+price;
    while(doc.getTextDimensions(blankSpaces).w <= len){
      blankSpaces += " "
    }
    return line+blankSpaces+price;
          
  }

  obtainData(doc: jspdf): [string, string[], number]{
    let conceptText: string = "";
    let priceArray: string[] = [];
    let totalPrice: number = 0;
    for (var i = 0; i < this.rows.length; i++) {
      conceptText += this.rows[i].concept;
      if(i < this.rows.length-1){
        conceptText += "--addedLineByRow--"
      }
      priceArray.push("-"+this.rows[i].price.toString()+"€");
      totalPrice += this.rows[i].price;
      console.log(typeof totalPrice)
      console.log(typeof this.rows[i].price)
    }
    return [conceptText, priceArray, totalPrice]
   
  }
  async createInvoice(){
    const doc = new jspdf();
   
    let conceptText = this.obtainData(doc)[0];
    let priceArray = this.obtainData(doc)[1];
    let totalPrice = this.obtainData(doc)[2];

    let splitText: string[] = this.addPriceToText(doc, conceptText, priceArray)
    doc.text(splitText,15,15);

    let ivaValue: number = 10;
      if(this.iva.value)
        ivaValue = this.iva.value

    let pricesArray: number[] = [];
    this.rows.forEach(value =>{
      pricesArray.push(value.price)
    })
    let invoice: Invoice = {
      id: 0,
      invoiceID: "",
      date: this.calculateDate(),
      concept: conceptText,
      prices: pricesArray.toString(),
      totalPrice: totalPrice,
      invoiceState: 'Borrador',
      iva: ivaValue,
      work: this.work
    }
    await this._invoiceService.save(invoice).subscribe();
    this.dialogRef.close();
    this._router.navigateByUrl("/facturas").then(() => {
      window.location.reload();
    });
  }

  async editInvoice(){
    const doc = new jspdf();
    let editedInvoice = this.invoice;
    let conceptText = this.obtainData(doc)[0];
    let totalPrice = this.obtainData(doc)[2];

    console.log(conceptText)

    let pricesArray: number[] = [];
    this.rows.forEach(value =>{
      pricesArray.push(value.price)
    })
    console.log(typeof pricesArray)
    editedInvoice.concept = conceptText;
    editedInvoice.prices = pricesArray.toString();
    editedInvoice.totalPrice = totalPrice;
    editedInvoice.invoiceState = this.context.getState();

    await this._invoiceService.update(editedInvoice).subscribe();

    this.dialogRef.close();
  }

  calculateDate(): string{
    let inputDate = new Date();
    let date = inputDate.getDate(); 
    let month = inputDate.getMonth() + 1; 
    let resYear = inputDate.getFullYear().toString();

    let resDate: string = inputDate.getDate().toString();
    let resMonth: string = month.toString();
    if (date < 10) {  resDate = '0' + resDate; } 
    if (month < 10) {  resMonth = '0' + resMonth; }

    return resDate + '/' + resMonth + '/' + resYear
  }

  keyUp(value: any){
    this.selectedStates = this.search(value.value);
  }
  search(value: string) { 
    let filter = value.toLowerCase();
    
    return this.selectedStates.filter(option =>{
      let fullName = option.firstName.toLowerCase() + " " + option.lastName.toLowerCase();
      
      return fullName.includes(filter);
    });
  }
  compareByID(itemOne: any, itemTwo: any){
    return itemOne && itemTwo && itemOne.id == itemTwo.id;
  }

  exportPDF(){
    let iva = 10;
    if(this.iva.value) iva = this.iva.value
    let res =this.context.printPDF(this.rows, iva, this.invoice, this.work);

    if (!res){
      this.showConfirmationModal("Error al imprimir la factura", "No se puede imprimir una factura en Borrador, pásela a Publicado y vuelva a intentarlo")
    }
  }

  changeState(){
    console.log("Changing state")
    this.context.transition()
  }

  showConfirmationModal(title: string, description: string): any{
    const modal: any = this._modalService.open(ConfirmationModalComponent);
    modal.componentInstance.title = title;
    modal.componentInstance.description = description;
    return modal;
}
}
