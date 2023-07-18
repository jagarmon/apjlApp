import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-delete-confirmation-modal',
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrls: ['./delete-confirmation-modal.component.css'],
})
export class DeleteConfirmationModalComponent {

  deletedElement: string = "";
	constructor(public modal: NgbActiveModal) {}

  cancelClick(): void{
    this.modal.close("cancelled");
  }

  continueClick(): void{
    this.modal.close("success");
  }
}

