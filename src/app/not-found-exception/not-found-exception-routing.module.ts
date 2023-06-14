import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundExceptionComponent } from './not-found-exception.component';

const routes: Routes = [{ path: '', component: NotFoundExceptionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotFoundExceptionRoutingModule { }
