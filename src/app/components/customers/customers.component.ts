import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {

  customers: Customer[] = [];

  constructor(private customerService: CustomerService){

  }

  ngOnInit(){
    this.customerService.findAll().subscribe(data => {
      this.customers = data;
    })
  }
}
