import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorksComponent } from './works.component';
import { WorksRoutingModule } from './works-routing.module';
import { SharedModule } from '../shared/shared.module';
import { WorksTableComponent } from '../works-table/works-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '../works-table/filter.pipe';
import { WorkModalComponent } from '../work-modal/work-modal.component';


@NgModule({
  declarations: [
    WorksComponent,
    WorksTableComponent,
    WorkModalComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    WorksRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class WorksModule { }
