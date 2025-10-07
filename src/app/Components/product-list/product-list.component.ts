import { Component, OnInit } from '@angular/core';
import { GetProductsService } from '../../services/get-products.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../Interfaces/IProducts';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { RouterLink } from "@angular/router";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductDetailComponent, RouterLink, RouterOutlet],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

  // creo el array de productos, 
  products: Product[] = [];


  constructor(private productsService: GetProductsService) {}

  ngOnInit() {
    // Cargar productos desde el servicio
    
    this.productsService.getProducts(1).subscribe({
      next: (products) => {
        console.log('Productos obtenidos de la API:', products);
        this.products = products;
 
      },
      error: (error) => {
        console.error('Error al obtener productos:', error);

       
      }
    });
  }

  selectedProductId: number | null = null;  //almaceno el id seleccionado

  //metodo para seleccionar un producto
  selectProduct(productId: number): void {
    this.selectedProductId = productId;
  }

}
