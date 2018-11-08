import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { FakeProductServiceInterceptor } from "./fake-product-service-interceptor";

export const FakeInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: FakeProductServiceInterceptor, multi: true }
];
