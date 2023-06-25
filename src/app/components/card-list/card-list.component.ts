import { Component, Input } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DetailsModalComponent } from './details-modal/details-modal.component';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { Card } from '../../models/card';


@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent {
  //Ocultar lista de imagenes con eventos para que el modal se vea bien

  @Input() dataArray: Card[] = [];
  settingsIcon=faGear;

  settingsPressed: boolean = false;

  modalCalled: boolean = false;

  result: any;

  constructor(private matDialog: MatDialog, private customerService: CustomerService){
  }
    
   DetailsModalMethod(idCard: number, field1name: string, field2name: string, field3name:string, field4name:string, field1value: string, field2value: string, field3value:string, field4value:string, type: string, image?: string): void {
    
    this.modalCalled = !this.modalCalled;
    
    const modalDialog = this.matDialog.open(DetailsModalComponent, {
      closeOnNavigation: false,
      disableClose: false,
      id: "details-modal",
      height: "600px",
      width: "600px",
      data: {
        idCard: idCard,
        field1name: field1name,
        field2name: field2name,
        field3name: field3name,
        field4name: field4name,
        field1value: field1value,
        field2value: field2value,
        field3value: field3value,
        field4value: field4value,
        type: type,
        image: image,
        settingsPressed: this.settingsPressed
      }
    });

    modalDialog.afterClosed().subscribe();
    
    }

  
  ngOnInit(){
    
    
  }
  
  settingsClick():void {
    this.settingsPressed = !this.settingsPressed
  }

}
