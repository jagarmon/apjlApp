import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {
  title: string = "";
  description: string = "";
	constructor(public modal: NgbActiveModal) {}

  cancelClick(): void{
    this.modal.close("cancelled");
  }

  continueClick(): void{
    this.modal.close("success");
  }
}
