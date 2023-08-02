import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './invoices.component';
import { SharedModule } from '../shared/shared.module';
import { InvoicesTableComponent } from '../invoices-table/invoices-table.component';
import { AutosizeModule } from 'ngx-autosize';
import { InvoicesTablePipe } from '../invoices-table/invoices-table.pipe';

@NgModule({
  declarations: [
    InvoicesComponent,
    InvoicesTableComponent,
    InvoicesTablePipe
  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    SharedModule,
    AutosizeModule,
    SharedModule
  ]
})
export class InvoicesModule { }
