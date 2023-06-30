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

    doc.text("Descripción                                                                Importe",15,15);
    
    doc.text("\nDescripción: "+this.description,10,10);
    doc.text("\nFactura " + this.work.name, 10, 10);
    doc.save('hello-world.pdf');
  }
}
