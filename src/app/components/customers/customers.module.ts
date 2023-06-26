import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { CardListComponent } from '../card-list/card-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { DetailsModalComponent } from '../card-list/details-modal/details-modal.component';
import { FloatingButtonComponent } from '../floating-button/floating-button.component';


@NgModule({
  declarations: [
    CustomersComponent,
    CardListComponent,
    DetailsModalComponent,
    FloatingButtonComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    FontAwesomeModule,
    FormsModule

  ]
})
export class CustomersModule { }
