import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
 categories = [
    "Silk Sarees",
    "Cotton Sarees",
    "Designer Sarees",
    "Wedding Collection",
    "Party Wear",
    "New Arrivals"
  ];
}
