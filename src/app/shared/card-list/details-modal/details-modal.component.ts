import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ImageService } from '../../../services/image.service';
import { Card } from '../models/card';
import { CustomerService } from '../../../services/customer.service';
import { Customer } from '../../../customers/models/customer';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.css']
})
export class DetailsModalComponent {

  card: Card = {
    idCard: -1,
    field1name: "",
    field2name: "",
    field3name: "",
    field4name: "",
    field1value: "",
    field2value:"",
    field3value: "",
    field4value: "",
    image: "",
    type: ""
  }
  settingsPressed: boolean = false;
  inputFile!: File;

  constructor( 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private imageService: ImageService, 
    private customerService: CustomerService,
    public dialogRef: MatDialogRef<DetailsModalComponent>
    ){
      this.settingsPressed = data.settingsPressed;
      this.card.idCard = data.idCard;
      this.card.field1name = data.field1name;
      this.card.field2name = data.field2name;
      this.card.field3name = data.field3name;
      this.card.field4name = data.field4name;
      this.card.field1value = data.field1value;
      this.card.field2value = data.field2value;
      this.card.field3value = data.field3value;
      this.card.field4value = data.field4value;
      this.card.image = data.image;
      this.card.type = data.type;
    }
  
  onChangeInput(event: any){
    this.inputFile = event.target.files[0];

  }

 
 save(): void{  
  
  this.updateElement()

  this.dialogRef.close();
  
  setTimeout(()=>{window.location.reload()},2000);

 }


 updateElement(): void{

  if(this.card.type == "updateCustomer"){

    let customer = this.createCustomerObject();
    setTimeout(()=>{this.customerService.update(customer).subscribe()},2000);

  } 
  else if(this.card.type == "createCustomer"){

    let customer = this.createCustomerObject();
    setTimeout(()=>{this.customerService.save(customer).subscribe()},2000);
  }
  else if(this.card.type == "provider") console.log("DO SOMETHING")
 }

 createCustomerObject(): Customer{
  let customer: Customer = {
    id: this.card.idCard,
    firstName: this.card.field1value,
    lastName: this.card.field2value,
    address: this.card.field3value,
    city: this.card.field4value,
    image: this.card.image
  }
  if (this.inputFile) {    

    this.imageService.upload(this.inputFile).subscribe(       
     (data: any)=>{
       if(data.body){
         customer.image = "../assets/images/"+data.body.fileName+".jpg";
       } 
     }   
   ) 
 }
 return customer;
 }
 
}
