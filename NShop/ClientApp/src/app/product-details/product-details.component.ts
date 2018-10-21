import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/Product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product:Product;
  statusMessage:string='Please wait.. Loading data..';

  constructor(private _productService:ProductService,private _activatedRout:ActivatedRoute) { }

  ngOnInit() {
    let id:string=this._activatedRout.snapshot.paramMap.get('id');
    this._productService.getProductDetails(id)
                        .subscribe(
                          response=>{
                            if(response==null)
                            {
                              this.statusMessage="There is no product with this id.";
                            }
                            else{
                              this.product=response
                            }
                          }
                          ,(error)=>{
                            console.log(error);
                            if(error.status===404)
                            {
                              this.statusMessage='Page not found';
                            }
                            else{
                            this.statusMessage=`Something went wrong.. We are working on it.. 
                            Please come after sometime`;
                            }
                          }
                          );
  }

}
