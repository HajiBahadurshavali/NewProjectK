import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService, CartItem } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';

declare var Razorpay: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutForm: FormGroup;
  cartTotal = 0;
  cartItems: CartItem[] = [];
  loading = false;
  orderCreated = false;
  currentOrder: any;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.checkoutForm = this.fb.group({
      shippingAddress: ['', Validators.required],
      shippingCity: ['', Validators.required],
      shippingState: ['', Validators.required],
      shippingZipCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      paymentMethod: ['razorpay', Validators.required]
    });
  }

  ngOnInit(): void {

    this.cartTotal = this.cartService.getCartTotal();

    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });

    this.loadRazorpayScript();
  }

  loadRazorpayScript(): void {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    document.body.appendChild(script);
  }

  onSubmit(): void {

    if (this.checkoutForm.invalid) {
      return;
    }

    this.loading = true;

    const orderData = {
      orderItems: this.cartItems.map(item => ({
        productName: item.name,
        quantity: item.quantity,
        unitPrice: item.price,
        totalPrice: item.price * item.quantity
      })),
      totalAmount: this.cartTotal,
      shippingAddress: this.checkoutForm.value.shippingAddress,
      shippingCity: this.checkoutForm.value.shippingCity,
      shippingState: this.checkoutForm.value.shippingState,
      shippingZipCode: this.checkoutForm.value.shippingZipCode
    };

    this.orderService.createOrder(orderData).subscribe({
      next: (response) => {

        this.currentOrder = response;
        this.orderCreated = true;

        this.initiatePayment(response);

        this.loading = false;
      },
      error: () => {

        this.snackBar.open('Error creating order', 'Close', { duration: 5000 });

        this.loading = false;
      }
    });
  }

  initiatePayment(order: any): void {

    const paymentRequest = {
      orderId: order.orderId,
      amount: order.totalAmount,
      currency: 'INR',
      description: `Saree order ${order.orderNumber}`
    };

    this.orderService.getPaymentOrder(paymentRequest).subscribe({
      next: (razorpayOrder) => {

        this.openRazorpayCheckout(razorpayOrder, order);
      },
      error: () => {

        this.snackBar.open('Error initiating payment', 'Close', { duration: 5000 });
      }
    });
  }

  openRazorpayCheckout(razorpayOrder: any, order: any): void {

    const options = {

      key: 'rzp_test_your_public_key',

      amount: order.totalAmount * 100,

      currency: 'INR',

      order_id: razorpayOrder.orderId,

      name: 'Saree Design Store',

      description: order.orderNumber,

      prefill: {
        email: this.authService.currentUserValue?.email
      },

      handler: (response: any) => {

        this.verifyPayment(response, order);
      },

      modal: {
        ondismiss: () => {

          this.snackBar.open('Payment cancelled', 'Close', { duration: 3000 });
        }
      }
    };

    const rzp = new Razorpay(options);

    rzp.open();
  }

  verifyPayment(response: any, order: any): void {

    const verification = {
      razorpayOrderId: response.razorpay_order_id,
      razorpayPaymentId: response.razorpay_payment_id,
      razorpaySignature: response.razorpay_signature
    };

    this.orderService.verifyPayment(verification).subscribe({
      next: (result) => {

        if (result.success) {

          this.snackBar.open('Payment successful!', 'Close', { duration: 3000 });

          this.cartService.clearCart();

          setTimeout(() => {

            this.router.navigate(['/order-history']);

          }, 1000);
        }
      },
      error: () => {

        this.snackBar.open('Payment verification failed', 'Close', { duration: 5000 });
      }
    });
  }

  get f() {
    return this.checkoutForm.controls;
  }

}