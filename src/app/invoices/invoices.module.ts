import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './invoices.component';
import { SharedModule } from '../shared/shared.module';
import { InvoicesTableComponent } from '../invoices-table/invoices-table.component';
import { InvoiceStateComponent } from '../invoice-state/invoice-state.component';
import { AutosizeModule } from 'ngx-autosize';


@NgModule({
  declarations: [
    InvoicesComponent,
    InvoicesTableComponent,
    InvoiceStateComponent
  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    SharedModule,
    AutosizeModule
  ]
})
export class InvoicesModule { }
