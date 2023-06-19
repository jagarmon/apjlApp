import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent {
  customers: Customer[] = [];
  constructor(private customerService: CustomerService){

  }

  ngOnInit(){
    this.customerService.findAll().subscribe(data => {
      this.customers = data;
    })
  }
}
