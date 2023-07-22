import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
 @Input() selectedRoute: string = ""

 homeIcon = faHouse;

 varPrueba : boolean = true;
 constructor(private _router: Router, private _route: ActivatedRoute){
    
 }

}
