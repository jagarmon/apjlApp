import { NgModule } from '@angular/core';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CustomersComponent,
  ],
  imports: [
    CustomersRoutingModule,
    SharedModule
  ]
})
export class CustomersModule { }
