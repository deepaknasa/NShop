import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpResponse, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpRequest } from "selenium-webdriver/http";
import { Observable, of, throwError } from "rxjs";
import { mergeMap, materialize, delay, dematerialize } from "rxjs/operators";
import { Product } from "../model/Product";

@Injectable()
export class FakeProductServiceInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return of(null).pipe(mergeMap(() => {
      let products: Product[] = JSON.parse(localStorage.getItem('products')) || [];
      if (request.url.endsWith('products/') && request.method === 'GET') {
        // find if any user matches login credentials
        if (products.length) {
          return of(new HttpResponse({ status: 200, body: products }));
        } else {
          // get fake products
          products = [
            <Product>{
              available: 10,
              description: "Fake red apple",
              id: 1,
              name: "Fake Apple",
              price: 12.5,
              unit: 'dozen'
            },
            <Product>{
              available: 10,
              description: "Fake Mangoes",
              id: 2,
              name: "Fake Mangoes",
              price: 10.5,
              unit: 'kg'
            }];
          // populate products into local storage
          localStorage.setItem('products', JSON.stringify(products));
          // and then return the fake products
          return of(new HttpResponse({ status: 200, body: products }));
        }
      }

      return next.handle(request);

    }))
      // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }
}
