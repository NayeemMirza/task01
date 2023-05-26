import { Component, computed } from '@angular/core';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent {
  pageTitle = 'Vehicals';
  errorMessage = '';

  vehicles = computed(() => {
    try {
      return this.vehicalService.vehicles();
    } catch (e){
      this.errorMessage = typeof e === 'string'? e : 'Error';
      return []
    }
  })
  selectedVehicle = this.vehicalService.selectedVehicle


  constructor(private vehicalService: VehicleService){

  }

  onSelected(vehicleName: string): void {
    this.vehicalService.vehicleSelected(vehicleName);
  }

}
