import { Component } from '@angular/core';
import { Invoice } from './models/invoice';
import { InvoiceService } from '../services/invoice.service';
@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent {
  invoices: Invoice[] = [];


  constructor(private invoiceService: InvoiceService){
  }

  ngOnInit(){
    this.invoiceService.findAll().subscribe(data => {
      this.invoices = data;  
    })
  }
}
