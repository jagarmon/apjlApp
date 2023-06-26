import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.css']
})
export class FloatingButtonComponent {
  @Input() buttonBorderColor: string = ""
  @Input() buttonBackGroundColor: string = ""
  @Input() buttonIcon!: IconDefinition;
  @Input() buttonLeft: string = "auto";
  @Input() buttonTop: string = "auto";
  @Input() buttonRight: string = "auto";
  @Input() buttonBottom: string = "auto";
  @Input() buttonWidth: string = "auto";
  @Input() buttonHeight: string = "auto";
}
