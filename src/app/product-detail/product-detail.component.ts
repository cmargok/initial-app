import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, productsList } from '../products/products.mock';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{

  producto?: Product;
  color: string = '';
  productLista : Product[] = productsList;
  loading: boolean = true;
  constructor(private _route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    setTimeout(() => {
      this._route.params.subscribe(params => {
        this.producto = this.productLista.find(product => product.id == params['productId']);
        this.loading = false;
      });
    }, 1500);
  
  }


}
