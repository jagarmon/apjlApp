import { Card } from '../../models/card';
import { CustomerService } from '../../services/customer.service';
import { Component } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Customer } from '../../models/customer';
import { MatDialog } from '@angular/material/dialog';
import { DetailsModalComponent } from '../card-list/details-modal/details-modal.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
  //TODO Añadir cardList[] 
  newCustomerIcon=faPlus;
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

  crearClienteClick(){
          
      const modalDialog = this.matDialog.open(DetailsModalComponent, {
        closeOnNavigation: false,
        disableClose: false,
        id: "details-modal",
        height: "600px",
        width: "600px",
        data: {
          idCard: "",
          field1name: "Nombre",
          field2name: "Apellido",
          field3name: "Dirección",
          field4name: "Ciudad",
          field1value: "",
          field2value: "",
          field3value: "",
          field4value: "",
          type: "createCustomer",
          image: "../assets/images/noImg.jpg",
          settingsPressed: true
        }
      });
  
      modalDialog.afterClosed().subscribe();
      
    
  }

}
