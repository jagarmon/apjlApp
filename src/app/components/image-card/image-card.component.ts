import { Component } from '@angular/core';
import { CustomerDetailsComponent } from '../customers/customer-details/customer-details.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CardListComponent } from '../card-list/card-list.component';
@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.css']
})
export class ImageCardComponent {
  //Ocultar lista de imagenes con eventos para que el modal se vea bien
  constructor(private matDialog: MatDialog){
    
  }
  
   customerDetailsMethod(): void {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.disableClose = true;
    dialogConfig.id = "customer-details";
    dialogConfig.height = "600px";
    dialogConfig.width = "600px";
    dialogConfig.position = {top: '0px', right:'0px'} 

    const modalDialog = this.matDialog.open(CardListComponent, dialogConfig);
    }
}
