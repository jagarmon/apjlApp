import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WorkService } from '../services/work.service';
import { Work } from '../works/models/work';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

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

  constructor(private router: Router){

  }

  createJobClick(){
    //LLAMAR A MODAL
  }

  editJobClick(data: any){
    //LLAMAR A MODAL
  }
  workClick(id: number){
    this.router.navigateByUrl("/trabajos/"+id)
  }
    
}
