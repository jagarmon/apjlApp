import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DetailsModalComponent } from '../shared/card-list/details-modal/details-modal.component';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent {

  constructor(private matDialog: MatDialog){
    
  }
  method(){
    //Pantalla con datos y con generar factura
    const modalDialog = this.matDialog.open(DetailsModalComponent, {
      closeOnNavigation: false,
      disableClose: false,
      id: "details-modal",
      height: "600px",
      width: "600px",
      data: {
        
      }
    });

    modalDialog.afterClosed().subscribe();
  }
}
