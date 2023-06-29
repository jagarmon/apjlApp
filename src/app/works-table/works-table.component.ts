import { Component, Input } from '@angular/core';
import { Work } from '../works/models/work';
import { Router } from '@angular/router';
import { faGear, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { WorkModalComponent } from '../work-modal/work-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WorkService } from '../services/work.service';
import { DeleteConfirmationModalComponent } from '../shared/card-list/delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-works-table',
  templateUrl: './works-table.component.html',
  styleUrls: ['./works-table.component.css']
})
export class WorksTableComponent {
  public filter: string = '';

  public filterType: string = '0';
  
  @Input() works: Work[] = [];

  newCustomerIcon=faPlus;

  settingsIcon=faGear;

  settingsPressed: boolean = false;

  cancelIcon=faXmark;


  constructor(
     private router: Router,
     private matDialog: MatDialog, 
     private _modalService: NgbModal,
     private _workService: WorkService
     ){

  }

  
  createWorkClick(){    
    const modalDialog = this.matDialog.open(WorkModalComponent, {
      closeOnNavigation: false,
      disableClose: false,
      id: "work-modal",
      height: "600px",
      width: "600px",
      data: {
        work: {
          name: "",
          description: "",
          address: "",
          city: "",
          price: 0,
          paid: false,
          customer: {
            lastName: "",
            firstName: "",
            address: "",
            city: "",
            image: ""
          }
        },
        settingsPressed: true,
        type:'create'
      }
    });
  }

  editWorkClick(work: Work){
    const modalDialog = this.matDialog.open(WorkModalComponent, {
      closeOnNavigation: false,
      disableClose: false,
      id: "work-modal",
      height: "600px",
      width: "600px",
      data: {
        work: work,
        settingsPressed: this.settingsPressed,
        type: 'update'
      }
    });
  }

  deleteWorkClick(work: Work){
    let modal = this.showConfirmationModal(work);

        modal.result.then((result: any) => {
          if ( result === 'success' ) {
            this.deleteWork(work); 
          }
        });   
  }

  deleteWork(work: Work){
    setTimeout(()=>{
      this._workService.delete(work.id).subscribe()
      window.location.reload()
    },2000);
  }
  
  settingsClick():void {
    this.settingsPressed = !this.settingsPressed
  }

  showConfirmationModal(work: Work): any{
    const modal: any = this._modalService.open(DeleteConfirmationModalComponent);
    modal.componentInstance.deletedElement = work.name;
    return modal;
  }
    
}
