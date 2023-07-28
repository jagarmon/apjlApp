import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ImageService } from '../../../services/image.service';
import { Card } from '../models/card';
import { CustomerService } from '../../../services/customer.service';
import { Customer } from '../../../customers/models/customer';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.css']
})
export class DetailsModalComponent {
  
  card = {} as Card
  settingsPressed: boolean = false;
  inputFile!: File;

  checkIcon = faCheck;
  cancelIcon=faXmark;

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
      this.card.field5name = data.field5name;
      this.card.field6name = data.field6name;
      this.card.field7name = data.field7name;
      this.card.field1value = data.field1value;
      this.card.field2value = data.field2value;
      this.card.field3value = data.field3value;
      this.card.field4value = data.field4value;
      this.card.field5value = data.field5value;
      this.card.field6value = data.field6value;
      this.card.field7value = data.field7value;
      this.card.image = data.image;
      this.card.type = data.type;
    }
  
  onChangeInput(event: any){
    this.inputFile = event.target.files[0];

  }

 
 saveClick(): void{  
  
  this.updateElement()

  this.dialogRef.close();
  
  setTimeout(()=>{window.location.reload()},2000);

 }

 closeClick(): void{  
  this.dialogRef.close();
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
    dni: this.card.field1value,
    firstName: this.card.field2value,
    lastName: this.card.field3value,
    address: this.card.field4value,
    city: this.card.field5value,
    postalCode: this.card.field6value,
    bankAccount: this.card.field7value,
    image: this.card.image
  }
  if (this.inputFile) {    

    this.imageService.upload(this.inputFile).subscribe(       
     (data: any)=>{
       if(data.body){
         customer.image = "assets/images/"+data.body.fileName+".jpg";
       } 
     } 
   ) 
 }
 return customer;
 }
 
}
