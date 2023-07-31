import { Component, Input } from '@angular/core';
import { Invoice } from '../invoices/models/invoice';
import jspdf from 'jspdf';
import { InvoiceModalComponent } from '../invoice-modal/invoice-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-invoices-table',
  templateUrl: './invoices-table.component.html',
  styleUrls: ['./invoices-table.component.css']
})
export class InvoicesTableComponent {
  @Input() invoices: Invoice[] = [];

  
  constructor(
    private _matDialog: MatDialog, 
    private _modalService: NgbModal){
      
    }
  ngOnInit(){

  }
  
  editInvoiceClick(invoice: Invoice){
    const doc = new jspdf();
    let priceArray = invoice.prices.split(",");
    let rows: [{}] = [{}];
    let textArray = invoice.concept.split("--addedLineByRow--\n")
    
    for(let i=0; i < textArray.length; i++){
      rows.push({
        concept: textArray[i],
        price: priceArray[i]
      })
    }
    rows.shift();
    const modalDialog = this._matDialog.open(InvoiceModalComponent, {
      closeOnNavigation: false,
      disableClose: true,
      id: "invoice-modal",
      height: "700px",
      width: "1200px",
      data: {
        data: invoice,
        rows: rows
      }
    });
  }


}
