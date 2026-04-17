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
      image: 'https://images.unsplash.com/photo-1727430228383-aa1fb59db8bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNhcmVlc3xlbnwwfHwwfHx8MA%3D%3D.unsplash.com/photo-1610030469983-98e550d6193c'
    },
    {
      name: 'Designer Saree',
      image: 'https://media.istockphoto.com/id/2072342092/photo/handmade-indian-sari-saree-with-golden-details-woman-wear-on-festival-ceremony-and-weddings.webp?a=1&b=1&s=612x612&w=0&k=20&c=fNsizNQbds8qt-uiXGsfdNiSumguCaZhizKTAIo-UTQ='
    },
    {
      name: 'Cotten Saree',
      image: 'https://static.vecteezy.com/system/resources/thumbnails/070/420/280/small/vibrant-silk-sarees-elegantly-arranged-with-candles-free-photo.jpg'
    },
    {
      name: 'Bridal Lehenga',
      image: 'https://www.freepik.com/premium-ai-image/elegant-woman-turquoise-silk-saree_418671470.htm#fromView=keyword&page=1&position=46&uuid=69e62636-8f48-48e6-88e4-77c80639cdf2&query=Saree'
    },
    {
      name: 'Anarkali Dress',
      image: 'https://example.com/anarkali-dress.jpg'
    },
    {
      name: 'Party Wear Saree',
      image: 'https://www.freepik.com/premium-photo/new-saree-is-made-from-cotton-has-green-border_43863488.htm#fromView=keyword&page=2&position=37&uuid=69e62636-8f48-48e6-88e4-77c80639cdf2&query=Saree'
    },
    {
      name: 'Traditional Kurti',
      image: 'https://images.unsplash.com/photo-1612423284934-2850a4ea4b2e'
    }
  ];
}
