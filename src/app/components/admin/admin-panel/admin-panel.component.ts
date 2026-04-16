import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { DesignService } from '../../../services/design.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  activeTab = 'orders';
  orders: any[] = [];
  designs: any[] = [];
  loading = false;

  constructor(
    private orderService: OrderService,
    private designService: DesignService
  ) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    // Implementation to load all orders
    this.loading = false;
  }

  loadDesigns(): void {
    this.loading = true;
    this.designService.getAllDesigns().subscribe({
      next: (designs) => {
        this.designs = designs;
        this.loading = false;
      }
    });
  }

  switchTab(tab: string): void {
    this.activeTab = tab;
    if (tab === 'designs') {
      this.loadDesigns();
    } else if (tab === 'orders') {
      this.loadOrders();
    }
  }
}