import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DetailsModalComponent } from '../shared/card-list/details-modal/details-modal.component';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Work } from './models/work';
import { WorkService } from '../services/work.service';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent {
  backIcon=faArrowLeft;

  works: Work[] = [];


  constructor(private workService: WorkService){
  }


  
  ngOnInit(){

    this.workService.findAll().subscribe(data => {
      this.works = data;      
    })

  }
}