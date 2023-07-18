import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorksComponent } from './works.component';
import { WorksRoutingModule } from './works-routing.module';
import { SharedModule } from '../shared/shared.module';
import { WorksTableComponent } from '../works-table/works-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '../works-table/filter.pipe';
import { WorkModalComponent } from '../work-modal/work-modal.component';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatRadioModule} from '@angular/material/radio';
import { InvoiceModalComponent } from '../invoice-modal/invoice-modal.component';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card'; 
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
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    MatSelectModule,
    MatRadioModule,
    MatFormFieldModule,
    MatCardModule
  ]
})
export class WorksModule { }
