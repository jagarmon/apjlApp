import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorksComponent } from './works.component';
import { WorksRoutingModule } from './works-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    WorksComponent
  ],
  imports: [
    CommonModule,
    WorksRoutingModule,
    SharedModule
  ]
})
export class WorksModule { }
