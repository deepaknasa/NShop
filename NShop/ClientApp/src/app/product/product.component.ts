import { Component, OnInit, Inject } from '@angular/core';
import { Product } from '../model/Product';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public productList: Product[];

    constructor(http: HttpClient, private productService: ProductService) {
  }

  ngOnInit() {
    this.productService.getProductList()
    .subscribe(products => this.productList = products);
  }

}
