import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>(this.getCartFromStorage());
  public cartItems$ = this.cartItems.asObservable();

  constructor() { }

  addToCart(item: CartItem): void {
    const items = this.cartItems.value;
    const existingItem = items.find(i => i.id === item.id);

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      items.push(item);
    }

    this.cartItems.next(items);
    this.saveCartToStorage(items);
  }

  removeFromCart(itemId: string): void {
    const items = this.cartItems.value.filter(i => i.id !== itemId);
    this.cartItems.next(items);
    this.saveCartToStorage(items);
  }

  updateQuantity(itemId: string, quantity: number): void {
    const items = this.cartItems.value;
    const item = items.find(i => i.id === itemId);
    if (item) {
      item.quantity = quantity;
      this.cartItems.next(items);
      this.saveCartToStorage(items);
    }
  }

  clearCart(): void {
    this.cartItems.next([]);
    localStorage.removeItem('cart_items');
  }

  getCartTotal(): number {
    return this.cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getCartItemsCount(): number {
    return this.cartItems.value.reduce((count, item) => count + item.quantity, 0);
  }

  private saveCartToStorage(items: CartItem[]): void {
    localStorage.setItem('cart_items', JSON.stringify(items));
  }

  private getCartFromStorage(): CartItem[] {
    const items = localStorage.getItem('cart_items');
    return items ? JSON.parse(items) : [];
  }
getCartItems(): Observable<CartItem[]> {
  return this.cartItems$;
}
}