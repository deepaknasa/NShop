import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<Category[]> {
    const observable = of(
      [
          {categoryId: 1, categoryName: 'Bakery'},
          {categoryId: 2, categoryName: 'Vegitables'},
          {categoryId: 3, categoryName: 'Fruits'}
      ]
  );
  return observable;
  }
}
