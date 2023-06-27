import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundExceptionRoutingModule } from './not-found-exception-routing.module';
import { NotFoundExceptionComponent } from './not-found-exception.component';


@NgModule({
  declarations: [
    NotFoundExceptionComponent
  ],
  imports: [
    CommonModule,
    NotFoundExceptionRoutingModule
  ]
})
export class NotFoundExceptionModule { }
