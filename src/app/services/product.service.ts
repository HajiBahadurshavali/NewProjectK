import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProductService {

  api = 'https://localhost:5001/api/products';

  constructor(private http: HttpClient) {}

  search(query: string) {
    return this.http.get<any[]>(`${this.api}/search?query=${query}`);
  }
}