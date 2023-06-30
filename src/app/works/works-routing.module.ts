import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorksComponent } from './works.component';
import { InvoicingComponent } from '../invoicing/invoicing.component';

const routes: Routes = [{ 
  path: '', 
  children: [
    {path: '', component: WorksComponent},
    {path: 'factura/:id', component: InvoicingComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorksRoutingModule { }