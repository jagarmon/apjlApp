import { Card } from '../../models/card';
import { CustomerService } from '../../services/customer.service';
import { Component } from '@angular/core';
import { Customer } from '../../models/customer';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {

  customers: Customer[] = [];
  cardList: Card[] = [];

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
      if(customer.image === null) customer.image = "../assets/images/noImg.jpg"
      
      this.cardList.push({
        idCard: customer.id,
        field1name: "Nombre",
        field2name: "Apellido",
        field3name: "Dirección",
        field4name: "Ciudad",
        field1value: customer.firstName,
        field2value: customer.lastName,
        field3value: customer.address,
        field4value: customer.city,
        image: customer.image,
        type: "updateCustomer"
      });
    });
  }

}
