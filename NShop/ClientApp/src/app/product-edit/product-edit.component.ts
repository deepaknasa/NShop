import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductCategoryService } from '../services/product-category.service';
import { Category } from '../model/category';
import { ProductUnitService } from '../services/product-unit.service';
import { Unit } from '../model/units';
import { ProductService } from '../services/product.service';
import { Product } from '../model/Product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
productItem: Product = null;
productForm: FormGroup;
productName = null;
productDescription = null;
productPrice: number;
productAvailableQuantity: number;
productUnitofMeasure = null;
productCategoryType = null;
categoryList: Category[];
unitList: Unit[];
  constructor(private productCategory: ProductCategoryService
            , private productUnit: ProductUnitService
            , private productService: ProductService
            , private _router: ActivatedRoute) {
              // this.productItem = new Product;
   }

   onSubmit() {
     console.log(this.productForm.value);
     console.log(this.productForm.controls.productName.value);
     const product = new Product;
     product.name = this.productForm.controls.productName.value;
     product.description = this.productForm.controls.productDescription.value;
     product.price = this.productForm.controls.productPrice.value;
     product.unit = this.productForm.controls.productUnitofMeasure.value;
     product.available = this.productForm.controls.productAvailableQuantity.value;
     this.productService.submitProduct(product);
   }

  ngOnInit() {
    this.productForm = new FormGroup({
      productName: new FormControl,
      productDescription: new FormControl,
      productPrice: new FormControl,
      productAvailableQuantity: new FormControl,
      productUnitofMeasure: new FormControl
    });
    this.getCategoryList();
    this.getProductUnitList();
    this.setFormValues();
  }

  setFormValues() {
    let productParamId: string;
    productParamId = this._router.snapshot.paramMap.get('id');
    if (productParamId != null) {
      this.productService.getProductDetails(productParamId)
                          .subscribe(product => {
                            this.productItem = product;
                            this.productForm.patchValue({
                              productName: this.productItem.name,
                              productPrice: this.productItem.price,
                              productDescription: this.productItem.description,
                              productAvailableQuantity: this.productItem.available,
                              productUnit: this.productItem.unit
                            });
                          });
    }
  }

  getCategoryList() {
    this.productCategory.getCategories()
        .subscribe(categoryList => {
          this.categoryList = categoryList;
        });
  }

  getProductUnitList() {
    this.productUnit.getProductUnits()
        .subscribe(unitList => {
          this.unitList = unitList;
        });
  }
}
