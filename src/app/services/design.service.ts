// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class DesignService {

//   constructor() { }
// }
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Design } from '../models/design.model';

@Injectable({
  providedIn: 'root'
})
export class DesignService {

  private apiUrl = 'http://localhost:5000/api/designs';

  constructor(private http: HttpClient) {}

  getAllDesigns(): Observable<Design[]> {
    return this.http.get<Design[]>(this.apiUrl);
  }
//   getDesignById(id: string) {
//   return this.http.get<any>(`${this.apiUrl}/${id}`);
// }
getDesignById(id: number) {
  return this.http.get<any>(`${this.apiUrl}/${id}`);
}

}