import { WorkService } from './../services/work.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Work } from '../works/models/work';
import { Customer } from '../customers/models/customer';
import jspdf from 'jspdf';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-invoicing',
  templateUrl: './invoicing.component.html',
  styleUrls: ['./invoicing.component.css']
})
export class InvoicingComponent {
  checkIcon=faCheck;
  backIcon=faArrowLeft;

  work = {} as Work;
  
  idNumber = 0;

  description: string = "";

  invoiceType: number = 0;

  textArea: string = "";

  chargeReason: string = "";

  price: number = 0;

  ivaManual: number = 10;

  invoiceFooter: string = "De acuerdo con lo que establece el reglamento europeo de protección de datos "+
  "RGPD 2016/679 y la Ley Orgánica de Protección de datos y garantía de derechos digitales (LOPD-GDD) del "+
  "5 de diciembre de 2018, le informamos que los datos personales recogidos en este documento serán "+
  "incluidos en un fichero bajo responsabilidad de [NOMBRE EMPRESA], con la finalidad "+
  "de cumplir los compromisos entre ambos, pudiendo rectificar, u oponer sus datos personales en [DIRECCIÓN]"
  
  iva = new FormControl(10);
  ivaList: number[] = [21, 10, 5, 4, 0];

  treatment = new FormControl("Don");
  treatmentList: string[] = ["Don", "Dña", ""];

  placeType = new FormControl("vivienda");
  placeTypeList: string[] = ["vivienda", "bloque", "piso", "casa", "terreno"];


  constructor(private _route: ActivatedRoute, private workService: WorkService){
    this.work.customer = {} as Customer
  }
  ngOnInit(){
    this.idNumber = parseInt(this._route.snapshot.paramMap.get('id') as string);
    
    this.workService.findWork(this.idNumber).subscribe(
      (data) => {
        if (data) this.work = data
        
      }
    );
  }

  exportAsPDF(){
    if(this.invoiceType) this.exportManual();
    else this.exportAutomatic();
  }

  exportManual(){
    const doc = new jspdf();

    let y: number = 0;

    this.setHeader(doc);

    doc.setFontSize(9);

    let razonCobro = "\n\n-"+this.chargeReason;

    let price = "\n\n-"+this.price;

    let splitText = doc.splitTextToSize(this.textArea, 130);

    this.deleteEndBlankSpaces(splitText);
    
    let lineHeight = doc.getLineHeight() / doc.internal.scaleFactor
    let lines = splitText.length; 

    doc.text(splitText,15,30);
    y = y + 30 + (lineHeight * lines)  

    doc.text(razonCobro, 15, y)
    doc.text(price, 160, y)

    this.setFooter(doc);

    this.populateFooter(doc, false);

    
    doc.output('dataurlnewwindow');
    doc.save("factura_"+this.work.customer.firstName+"_"+this.work.customer.lastName)
  }

  exportAutomatic() {
    const doc = new jspdf();

    this.setHeader(doc)

    doc.setFontSize(9);

    let y: number = 0;

    let text: string = "Por la realización del trabajo: "+this.work.name+" en " +
    this.placeType.value + " situada en "+this.work.address + ", " + this.work.city + "," +
    " propiedad de "+this.treatment.value+" "+this.work.customer.firstName+" "+
    this.work.customer.lastName+" con DNI "+this.work.customer.dni

    let splitText = doc.splitTextToSize(text, 130);

    let lineHeight = doc.getLineHeight() / doc.internal.scaleFactor
    let lines = splitText.length; 

    doc.text(splitText,15,30);
    y = y + 30 + (lineHeight * lines)  

    doc.setFont("arial", "bold")
    doc.text("\n\n- Trabajos de albañilería y materiales ",15,y);
    doc.text("\n\n-"+this.work.price.toString()+"€",160,y);

    this.setFooter(doc);

    this.populateFooter(doc, true);
    
    
    doc.output('dataurlnewwindow');
    doc.save("factura_"+this.work.customer.firstName+"_"+this.work.customer.lastName)

  }

  setHeader(doc: jspdf){
    doc.text("Descripción",15,15);
    doc.text("Importe",160,15)
    doc.line(15,20,180,20)
  }

  setFooter(doc: jspdf){
    doc.setFont("arial", "normal")
    doc.line(15,260,180,260)
    doc.text("Base imponible",40,263);
    doc.text("% IVA",70,263);
    doc.text("Cuota IVA",90,263);

    doc.setFont("arial", "bold")
    doc.text("Total factura",120,263);
    doc.line(15,265,180,265);

    doc.setFont("arial", "normal");

    doc.text( doc.splitTextToSize(this.invoiceFooter, 180), 15, 273);
  }

  populateFooter(doc: jspdf, automatic: boolean){
    let price: number = 0;
    let ivaValue: number = 0;
    if(automatic){
      price = this.work.price;
      if(this.iva.value) ivaValue = this.iva.value;
    } 
    else{
      price = +this.price;
      ivaValue = +this.ivaManual;
    } 
    console.log(ivaValue)
    

    doc.setFont("arial","bold")

    //Base imponible
    doc.text("-"+price.toString(),40,268);
     
    let ivaCalculated: number = 0;
    

    //Cuota IVA
    ivaCalculated = price * (+ivaValue/100); 
       
    //IVA
    doc.text(ivaValue.toString()+"%",70,268);

    //Cuota IVA
    doc.text("-"+ivaCalculated.toFixed(2).toString(),90,268);
    //Total factura
    doc.setFont("arial", "bold")
    let totalPrice: number = ivaCalculated + price;
    
    doc.text("-"+totalPrice.toString(),120,268);
  }

  deleteEndBlankSpaces(array: String[]){
    var i = array.length - 1
    while(array[i] === ""){
      array.pop()
      i--;
    } 
  }
}
