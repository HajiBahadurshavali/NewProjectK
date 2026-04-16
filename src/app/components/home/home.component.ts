import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
 products = [
    {
      name: 'Silk Saree',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c'
    },
    {
      name: 'Designer Saree',
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf'
    },
    {
      name: 'Bridal Lehenga',
      image: 'https://images.unsplash.com/photo-1593032465171-8d3c8f9f0d02'
    },
    {
      name: 'Anarkali Dress',
      image: 'https://images.unsplash.com/photo-1622295023453-8c1e3b9c7cdb'
    },
    {
      name: 'Party Wear Saree',
      image: 'https://images.unsplash.com/photo-1602810318660-d2c46b750b2d'
    },
    {
      name: 'Traditional Kurti',
      image: 'https://images.unsplash.com/photo-1612423284934-2850a4ea4b2e'
    }
  ];
}
