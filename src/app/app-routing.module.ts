import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewHomeComponent } from './new-home/new-home.component';
import { CartShellComponent } from './cart/cart-shell/cart-shell.component';
import { VehicleShellComponent } from './vehicle/vehicle-shell/vehicle-shell.component';

const routes: Routes = [
  { path: 'welcome', component: NewHomeComponent },
  { path: 'vehicles', component: VehicleShellComponent },
  {
    path: 'cart',
    component: CartShellComponent
  },
  { path: '', redirectTo: 'vehicles', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
