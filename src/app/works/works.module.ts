import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorksComponent } from './works.component';
import { WorksRoutingModule } from './works-routing.module';
import { SharedModule } from '../shared/shared.module';
import { WorksTableComponent } from '../works-table/works-table.component';
import { FilterPipe } from '../works-table/filter.pipe';
import { WorkModalComponent } from '../work-modal/work-modal.component';
import { MatRadioModule } from '@angular/material/radio';
import { InvoiceModalComponent } from '../invoice-modal/invoice-modal.component';
import {AutosizeModule} from 'ngx-autosize';
@NgModule({
  declarations: [
    WorksComponent,
    WorksTableComponent,
    WorkModalComponent,
    FilterPipe,
    InvoiceModalComponent
  ],
  imports: [
    CommonModule,
    WorksRoutingModule,
    SharedModule,
    MatRadioModule,
    AutosizeModule
  ]
})
export class WorksModule { }
