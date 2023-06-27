import { Component } from '@angular/core';
import { faUser, faBriefcase, faBuilding, faHelmetSafety } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-icon-index',
  templateUrl: './icon-index.component.html',
  styleUrls: ['./icon-index.component.css']
})
export class IconIndexComponent {
  customersIcon=faUser;
  providersIcon=faBuilding;
  materialIcon=faBriefcase;
  worksIcon=faHelmetSafety
}
