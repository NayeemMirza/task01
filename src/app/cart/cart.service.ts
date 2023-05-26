import { Injectable, computed, signal } from '@angular/core';
import { Vehicle } from '../vehicle/vehicle';
import { CartItem } from './cart';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { } 

  cartItems = signal<CartItem[]>([]);
  subTotal = computed(() => this.cartItems().reduce(
    (a, b) => a + b.quantity * Number(b.vehicle.cost_in_credits), 0
  ));
  deliveryFee = computed(() => this.subTotal() < 100000 ? 999 : 0);
  tax = computed(() => Math.round(this.subTotal() * 10.75) / 100);
  TotalPrice = computed(() => this.subTotal() + this.deliveryFee() + this.tax())

  addToCart(vehicle: Vehicle){
    this.cartItems.mutate(item => item.push({vehicle, quantity: 1}))
  }

  removeCartItem(cartItem : CartItem){
    this.cartItems.update(item => item.filter(item => item.vehicle.name !== cartItem.vehicle.name))
  }

  updateInCart(cartItem: CartItem, quantity: Number){ 
    let qNumber = Number(quantity)
    this.cartItems.update(item =>
      item.map( item => item.vehicle.name === cartItem.vehicle.name ? {vehicle: cartItem.vehicle, quantity: qNumber} : item)
      )
  }

}
