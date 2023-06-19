import { Component, Input } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CustomerDetailsComponent } from '../customers/customer-details/customer-details.component';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent {
  //Ocultar lista de imagenes con eventos para que el modal se vea bien
 

  @Input() cardTitle: string = "";
  @Input() cardImage: string = "";

  constructor(private matDialog: MatDialog, private customerService: CustomerService){
  }
  
   customerDetailsMethod(): void {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.disableClose = true;
    dialogConfig.id = "customer-details";
    dialogConfig.height = "600px";
    dialogConfig.width = "600px";
    dialogConfig.position = {top: '0px', right:'0px'} 

    const modalDialog = this.matDialog.open(CustomerDetailsComponent, dialogConfig);
    }

  
  ngOnInit(){
     if(this.cardImage===""){
      this.cardImage="../assets/images/noImg.jpg"
    } 
  }
}
