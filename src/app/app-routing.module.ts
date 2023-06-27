import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
  path: 'inventory', 
  loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule) 
},
  { path: 'clientes', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) },
  { path: 'trabajos', loadChildren: () => import('./works/works.module').then(m => m.WorksModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', loadChildren: () => import('./not-found-exception/not-found-exception.module').then(m => m.NotFoundExceptionModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
