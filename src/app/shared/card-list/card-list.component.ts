import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faGear, faXmark, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Card } from './models/card';
import { CustomerService } from '../../services/customer.service';
import { DetailsModalComponent } from './details-modal/details-modal.component';
import { DeleteConfirmationModalComponent } from './delete-confirmation-modal/delete-confirmation-modal.component';


@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent {

  @Input() dataArray: Card[] = [];

  newCustomerIcon=faPlus;

  settingsIcon=faGear;

  cancelIcon=faXmark;

  settingsPressed: boolean = false;

  constructor(private matDialog: MatDialog, private customerService: CustomerService, private _modalService: NgbModal){
  }
    
  editClick(data: any): void {
        
    const modalDialog = this.matDialog.open(DetailsModalComponent, {
      closeOnNavigation: false,
      disableClose: false,
      id: "details-modal",
      height: "600px",
      width: "600px",
      data: {
        idCard: data.idCard,
        field1name: data.field1name,
        field2name: data.field2name,
        field3name: data.field3name,
        field4name: data.field4name,
        field1value: data.field1value,
        field2value: data.field2value,
        field3value: data.field3value,
        field4value: data.field4value,
        type: data.type,
        image: data.image,
        settingsPressed: this.settingsPressed
      }
    });

    modalDialog.afterClosed().subscribe();
    
    }

    deleteClick(data: any): void{
      
      if(data.type= "updateCustomer"){

        let modal = this.showConfirmationModal(data);

        modal.result.then((result: any) => {
          if ( result === 'success' ) {
            this.deleteCustomer(data); 
          }
        });   
        }
        
    }

    deleteCustomer(data: any){
      setTimeout(()=>{
        this.customerService.delete(data.idCard).subscribe()
        window.location.reload()
      },2000);
    }

    showConfirmationModal(data: any): any{
      const modal: any = this._modalService.open(DeleteConfirmationModalComponent);
      modal.componentInstance.deletedElement = data.field1value + " " + data.field2value;
      return modal;
    }
    createClick(){
            
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
  
  settingsClick():void {
    this.settingsPressed = !this.settingsPressed
  }

}
