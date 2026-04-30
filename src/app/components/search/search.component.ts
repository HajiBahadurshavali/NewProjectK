import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {

  query = '';
  products: any[] = [];
  searchSubject = new Subject<string>();

  constructor(private service: ProductService) {
    this.searchSubject.pipe(debounceTime(300))
      .subscribe(value => {
        this.service.search(value)
          .subscribe(res => this.products = res);
      });
  }

  onSearch() {
    this.searchSubject.next(this.query);
  }
}