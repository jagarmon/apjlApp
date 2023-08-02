import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-invoice-state',
  templateUrl: './invoice-state.component.html',
  styleUrls: ['./invoice-state.component.css']
})
export class InvoiceStateComponent {
  @Input() disabled: boolean = false;

  @Input() selectedButton: string = "Borrador"

  @Output() clickedButton: EventEmitter<string> = new EventEmitter();

  buttonClick(){
    this.clickedButton.emit()
  }
}
