import { Prueba } from './prueba';
import { ImageService } from './../../../services/image.service';
import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, NgForm } from '@angular/forms';
import { Card } from '../../../models/card';
import { CustomerService } from '../../../services/customer.service';
import {HttpHeaders} from '@angular/common/http';
import { param } from 'jquery';
import { Customer } from '../../../models/customer';

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
    image: ""
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
    }
  ngOnInit(){
  }
  
  onChangeInput(event: any){

    console.log(this.card)
    this.inputFile = event.target.files[0];

  }

 
 save(): void{

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
  
  setTimeout(()=>{this.updateCustomer(customer)},2000);

  this.dialogRef.close();
  
  setTimeout(()=>{window.location.reload()},2000);
 }
 updateCustomer(customer: Customer): void{
  this.customerService.update(customer).subscribe();
 }


 
 close(): void{
  
 }

}
