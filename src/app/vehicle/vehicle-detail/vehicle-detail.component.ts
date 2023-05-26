import { Component, computed } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { CartService } from 'src/app/cart/cart.service';
import { Vehicle } from '../vehicle';


@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent {
  vehicle = this.vechileService.selectedVehicle;
  pageTitle = computed(() => this.vehicle() ? `Dtail for: ${this.vehicle()?.name}` : '')

  vehicleFilms = this.vechileService.vehicleFilms
  constructor(
    private vechileService: VehicleService,
    private cartService: CartService){}

  addToCart( vehicle: Vehicle | undefined){
    if(vehicle){
      this.cartService.addToCart(vehicle)
    }
  }

}
