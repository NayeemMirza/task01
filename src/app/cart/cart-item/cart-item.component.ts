import { Component, Input, computed, signal } from '@angular/core';
import { CartItem } from '../cart';
import { CartService } from '../cart.service'; 

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {
 
  _item!: CartItem;
  get item(): CartItem {
    return this._item;
  }
  @Input() set item(item: CartItem) {
    this._item = item;
    this.cartItem.set(item);
  }

  // Hard-coded quantity
  // These could instead come from an inventory system
  qtyArr = signal([1, 2, 3, 4, 5, 6, 7, 8]);

  // Cart item signal
  cartItem = signal(this.item);

  // When the item changes, recalculate the extended price
  exPrice = computed(() =>
    this.cartItem().quantity * Number(this.cartItem().vehicle.cost_in_credits));

  constructor(private cartService: CartService) { }

  onQuantitySelected(quantity: number): void {
    // Update the quantity in the item
    this.cartService.updateInCart(this.cartItem(), Number(quantity));
  }

  onRemove(): void {
    this.cartService.removeCartItem(this.cartItem());
  }
}
