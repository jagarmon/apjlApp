import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faXmark, faPlus, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Card } from './models/card';
import { CustomerService } from '../../services/customer.service';
import { DetailsModalComponent } from './details-modal/details-modal.component';
import { DeleteConfirmationModalComponent } from '../delete-confirmation-modal/delete-confirmation-modal.component';
import { catchError, Observable, throwError, empty } from 'rxjs';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent {

  @Input() dataArray: Card[] = [];

  newCustomerIcon=faPlus;

  settingsIcon=faPenToSquare

  cancelIcon=faXmark;

  settingsPressed: boolean = false;

  constructor(private matDialog: MatDialog, private customerService: CustomerService, private _modalService: NgbModal){
  }
    
  editClick(data: any): void {
        
    const modalDialog = this.matDialog.open(DetailsModalComponent, {
      closeOnNavigation: false,
      disableClose: false,
      id: "details-modal",
      height: "800px",
      width: "600px",
      data: {
        idCard: data.idCard,
        field1name: data.field1name,
        field2name: data.field2name,
        field3name: data.field3name,
        field4name: data.field4name,
        field5name: data.field5name,
        field1value: data.field1value,
        field2value: data.field2value,
        field3value: data.field3value,
        field4value: data.field4value,
        field5value: data.field5value,
        type: data.type,
        image: data.image,
        settingsPressed: this.settingsPressed
      }
    });

    modalDialog.afterClosed().subscribe();
    
    }

    onErrorImage(data: any){
      data.image = "assets/images/noImg.jpg"
    }
    deleteClick(data: any): void{
      
      if(data.type= "updateCustomer"){
        let modal = this.showDeleteConfirmationModal(data);

        modal.result.then((result: any) => {
          if ( result === 'success' ) {
            this.deleteCustomer(data); 
          }else{
          }
        });   
        }
        
    }

    deleteCustomer(data: any){
        
        this.customerService.delete(data.idCard)
        .subscribe(
          (data)=>{
            window.location.reload()
          },
          (error)=>{
            this.showConfirmationModal(error.error.message)
          }
        )
       
    }

    showConfirmationModal(title: string): any{
      const modalDialog = this.matDialog.open(ConfirmationModalComponent, {
        closeOnNavigation: false,
        disableClose: true,
        id: "confirmation-modal",
        height: "200px",
        width: "400px",
        data: {
         title: title
        }
      });
    }

    showDeleteConfirmationModal(data: any): any{
      const modal: any = this._modalService.open(DeleteConfirmationModalComponent);
      modal.componentInstance.deletedElement = data.field2value + " " + data.field3value;
      return modal;
    }
    createClick(){
            
      const modalDialog = this.matDialog.open(DetailsModalComponent, {
        closeOnNavigation: false,
        disableClose: false,
        id: "details-modal",
        height: "800px",
        width: "600px",
        data: {
          idCard: "",
          field1name: "DNI",
          field2name: "Nombre",
          field3name: "Apellido",
          field4name: "Dirección",
          field5name: "Ciudad",
          field1value: "",
          field2value: "",
          field3value: "",
          field4value: "",
          field5value: "",
          type: "createCustomer",
          image: "assets/images/noImg.jpg",
          settingsPressed: true
        }
      });

      modalDialog.afterClosed().subscribe();      
    
    }
  
  settingsClick():void {
    this.settingsPressed = !this.settingsPressed
  }

}
