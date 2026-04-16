import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total = 0;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  removeItem(itemId: string): void {
    this.cartService.removeFromCart(itemId);
  }

        updateQuantity(itemId: string, event: Event): void {
    const quantity = +(event.target as HTMLInputElement).value;
    if (quantity > 0) {
      this.cartService.updateQuantity(itemId, quantity);
    }
  }

  calculateTotal(): void {
    this.total = this.cartService.getCartTotal();
  }

  proceedToCheckout(): void {
    if (this.cartItems.length > 0) {
      this.router.navigate(['/checkout']);
    }
  }

  continueShopping(): void {
    this.router.navigate(['/designs']);
  }
}