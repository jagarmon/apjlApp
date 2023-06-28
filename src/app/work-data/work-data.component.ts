import { CustomerService } from './../services/customer.service';
import { Component, Input } from '@angular/core';
import { WorkService } from '../services/work.service';
import { Work } from '../works/models/work';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../customers/models/customer';

@Component({
  selector: 'app-work-data',
  templateUrl: './work-data.component.html',
  styleUrls: ['./work-data.component.css']
})
export class WorkDataComponent {
  work = {} as Work;
  customers= [] as Customer[];

  id: string | null = "";
  constructor(private route: ActivatedRoute, private workService: WorkService, private customerService: CustomerService){

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    if(this.id){
      let idNumber: number = +this.id    
      this.workService.findWork(idNumber).subscribe(
        (data)=>{
          if(data) this.work = data;
        }
      );
    }

    this.customerService.findAll().subscribe(
      data => {
      if(data) this.customers = data;      
    })
  }
}
