import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Clipboard} from '@angular/cdk/clipboard';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-copy-clipboard-modal',
  templateUrl: './copy-clipboard-modal.component.html',
  styleUrls: ['./copy-clipboard-modal.component.css']
})
export class CopyClipboardModalComponent {
  title: string = "";
  description: string = "";

  clickedButton: boolean = false;
  copyIcon = faCopy;
	constructor(
    public modal: NgbActiveModal,
    private _clipboard: Clipboard) {}

  @Input() invoiceID = ""
  cancelClick(): void{
    this.modal.close("cancelled");
  }

  continueClick(): void{
    this.modal.close("success");
  }

  copyToClipboardClick(){
    this._clipboard.copy(this.invoiceID);
    this.clickedButton = true;
  }
}
