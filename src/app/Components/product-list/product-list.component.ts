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
  // Variable para manejar estado del carrito
  isIncart: boolean = false;
  // Array para productos
  products: Product[] = [];
  // Objeto para manejar el estado del carrito por producto -->TIENE ID PRODUCTO Y ESTADO
  productsInCart: { [productId: number]: boolean } = {};
  // contador carrito
  cartCount: number = 0;

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

  selectedProductId: number | null = null;  // CREO VARIABLE PARA ALMACENAR ID_PRODUCTO

  //metodo para seleccionar un producto
  selectProduct(productId: number): void {
    this.selectedProductId = productId;
  }

  // Método para alternar el estado del carrito
  toggleCart(): void {
    this.isIncart = !this.isIncart;
    console.log('Estado del carrito cambiado a:', this.isIncart);
  }

  // Método para manejar el estado del carrito por producto
  toggleProductCart(productId: number): void {

    // Alternamos el estado
    this.productsInCart[productId] = !this.productsInCart[productId];
    
    console.log(`Producto ${productId} en carrito:`, this.productsInCart[productId]);
    
  }
}
