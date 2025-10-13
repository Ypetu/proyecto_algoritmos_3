import { Component, OnInit } from '@angular/core';
import { GetProductsService } from '../../services/get-products.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../Interfaces/IProducts';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { RouterLink } from "@angular/router";
import { RouterOutlet } from "@angular/router";
import { CartService } from '../../services/cart-service.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductDetailComponent, RouterLink, RouterOutlet],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  // Array para productos
  products: Product[] = [];
  // Objeto para manejar el estado del carrito por producto -->TIENE ID PRODUCTO Y ESTADO
  productsInCart: { [productId: number]: boolean } = {};
  // contador carrito
  cartCount: number = 0;

  constructor(private productsService: GetProductsService, private cartService: CartService) {}

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
    if (this.productsInCart[productId]) {
      console.log(`El producto ${productId} ya está en el carrito.`);
      
      return; // Si ya está en el carrito, no hacer nada
    }
    this.selectedProductId = productId;
  }

  // Método para manejar el estado del carrito por producto
  toggleProductCart(productId: number): void {
    // Buscamos el producto en nuestro array de productos
    const product = this.products.find(p => p.id === productId);
    
    if (!product) {
      console.error(`Producto con ID ${productId} no encontrado`);
      return;
    }

    // Alternamos el estado del producto accediendo por su ID
    this.productsInCart[productId] = !this.productsInCart[productId];
    
    if (this.productsInCart[productId]) {
      // Si el producto ahora está en el carrito, lo agregamos
      this.cartService.addTocart(product);
      console.log(`Producto ${productId} agregado al carrito`);
    } else {
      // Si el producto ya no está en el carrito, lo quitamos
      this.cartService.removeFromCart(productId);
      console.log(`Producto ${productId} eliminado del carrito`);
    }
  }
}
