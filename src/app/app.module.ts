import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewHomeComponent } from './new-home/new-home.component'; 
import { HttpClientModule } from '@angular/common/http';
import { VehicleListComponent } from './vehicle/vehicle-list/vehicle-list.component';
import { VehicleShellComponent } from './vehicle/vehicle-shell/vehicle-shell.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { CartListComponent } from './cart/cart-list/cart-list.component';
import { CartShellComponent } from './cart/cart-shell/cart-shell.component';
import { CartTotalComponent } from './cart/cart-total/cart-total.component';
import { VehicleDetailComponent } from './vehicle/vehicle-detail/vehicle-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewHomeComponent,
    VehicleListComponent,
    VehicleShellComponent,
    CartItemComponent,
    CartListComponent,
    CartShellComponent,
    CartTotalComponent,
    VehicleDetailComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,   
  ],
  providers: [],
  exports:[
    VehicleListComponent,
    VehicleDetailComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
