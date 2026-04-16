import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:5000/api/orders';

  constructor(private http: HttpClient) { }

  createOrder(orderData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, orderData);
  }

  getMyOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/my-orders`);
  }

  getOrder(orderId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${orderId}`);
  }

  getPaymentOrder(paymentRequest: any): Observable<any> {
    return this.http.post('http://localhost:5000/api/payment/create-order', paymentRequest);
  }

  verifyPayment(verification: any): Observable<any> {
    return this.http.post('http://localhost:5000/api/payment/verify-payment', verification);
  }
}