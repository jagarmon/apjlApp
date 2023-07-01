import { WorkService } from './../services/work.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Work } from '../works/models/work';
import { Customer } from '../customers/models/customer';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-invoicing',
  templateUrl: './invoicing.component.html',
  styleUrls: ['./invoicing.component.css']
})
export class InvoicingComponent {
  backIcon=faArrowLeft;
  work = {} as Work;
  
  idNumber = 0;

  description: string= "";

  iva: number=10;

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

  public exportAsPDF() {
    const doc = new jspdf();

    doc.text("Descripción",15,15);
    doc.text("Importe",160,15)
    doc.line(15,20,180,20)

    doc.setFontSize(9);
    doc.text("Por la realización del trabajo: "+this.work.name+" en la [vivienda/bloque/etc?]",15,30);
    doc.text("situada en "+this.work.address + ", " + this.work.city + ",",15,35)
    doc.text("propiedad de [don/dña] "+this.work.customer.firstName+" "+this.work.customer.lastName+" con DNI "+this.work.customer.dni,15,40)
    
    doc.setFont("arial", "bold")
    doc.text("- Trabajos de albañilería y materiales ",15,50);
    doc.text("-"+this.work.price.toString()+"€",160,50)


    doc.setFont("arial", "normal")
    doc.line(15,260,180,260)
    doc.text("Base imponible",40,263);
    doc.text("% IVA",70,263);
    doc.text("Cuota IVA",90,263);

    doc.setFont("arial", "bold")
    doc.text("Total factura",120,263);
    doc.line(15,265,180,265)

    doc.setFont("arial", "normal")
    //Base imponible
    doc.text("-"+this.work.price.toString(),40,268);
    //IVA
    doc.text(this.iva.toString(),70,268);
    //Cuota IVA
    let ivaCalculated = this.work.price * (this.iva/100);
    doc.text("-"+ivaCalculated.toString(),90,268);
    //Total factura
    let totalPrice = ivaCalculated + this.work.price;
    doc.setFont("arial", "bold")
    doc.text("-"+totalPrice.toString(),120,268);

    //doc.text("Descripción: "+this.description,10,30);
    
    //doc.text("\nDescripción: "+this.description,10,10);
    //doc.text("\nFactura " + this.work.name, 10, 10);
    doc.output('dataurlnewwindow');
    //doc.save('hello-world.pdf');
  }
}
