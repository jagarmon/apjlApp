import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { 
  path: 'inventory', 
  loadChildren: () => import('./components/inventory/inventory.module').then(m => m.InventoryModule) 
},
  { path: 'customers', loadChildren: () => import('./components/customers/customers.module').then(m => m.CustomersModule) },
  { path: 'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', loadChildren: () => import('./components/not-found-exception/not-found-exception.module').then(m => m.NotFoundExceptionModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
