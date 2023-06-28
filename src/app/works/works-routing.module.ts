import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorksComponent } from './works.component';
import { WorkDataComponent } from '../work-data/work-data.component';

const routes: Routes = [{ 
  path: '', 
  children: [
    {path: '', component: WorksComponent},
    {path: ':id', component: WorkDataComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorksRoutingModule { }