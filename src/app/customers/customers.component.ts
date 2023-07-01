import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { Customer } from './models/customer';
import { Card } from '../shared/card-list/models/card';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {

  customers: Customer[] = [];
  cardList: Card[] = [];

  backIcon=faArrowLeft;

  constructor(private matDialog: MatDialog, private customerService: CustomerService){

  }

  ngOnInit(){
    this.customerService.findAll().subscribe(data => {
      this.customers = data;
      this.mapCardImage();
      
    })

  }
  mapCardImage(): void{
    
    this.customers.forEach(customer => {
      if(customer.image === null) customer.image = "assets/images/noImg.jpg"
      
      this.cardList.push({
        idCard: customer.id,
        field1name: "DNI",
        field2name: "Nombre",
        field3name: "Apellido",
        field4name: "Dirección",
        field5name: "Ciudad",    
        field1value: customer.dni,    
        field2value: customer.firstName,
        field3value: customer.lastName,
        field4value: customer.address,
        field5value: customer.city,
        image: customer.image,
        type: "updateCustomer"
      });
    });
  }

  goBackClick(){
    
  }

}
