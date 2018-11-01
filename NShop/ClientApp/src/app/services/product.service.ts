import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../model/Product';
import { NshopConfigService } from './nshop-config.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
baseUrlString: string;
  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string, private appConfig: NshopConfigService) {
      this.baseUrlString = this.baseUrl + this.appConfig.getConfig()['defaultAPIMethod'];
   }

   getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrlString);
   }

   getProductDetails(id) {
     return this.http.get<Product>(this.baseUrlString + '/' + id);
   }

   submitProduct(product: Product) {
     console.log(product);
      return this.http.post(this.baseUrlString, product, {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json'
                    })
                  });
                  // .subscribe(response => console.log(response));
   }
}
