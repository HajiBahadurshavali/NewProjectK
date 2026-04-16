import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orders: any[] = [];
  loading = true;
  displayedColumns = ['orderNumber', 'date', 'amount', 'status', 'tracking'];

  constructor(
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getMyOrders().subscribe({
      next: (response) => {
        this.orders = response;
        this.loading = false;
      },
      error: (error) => {
        this.snackBar.open('Error loading orders', 'Close', { duration: 5000 });
        this.loading = false;
      }
    });
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'delivered': return 'green';
      case 'shipped': return 'blue';
      case 'processing': return 'orange';
      case 'pending': return 'red';
      default: return 'gray';
    }
  }
}