import { Component } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-total',
  templateUrl: './cart-total.component.html',
  styleUrls: ['./cart-total.component.scss']
})
export class CartTotalComponent {
  cartItems = this.cartService.cartItems
  subTotal = this.cartService.subTotal
  deliveryFee = this.cartService.deliveryFee
  tax = this.cartService.tax
  totalPrice = this.cartService.TotalPrice
  constructor(private cartService: CartService){}
}
