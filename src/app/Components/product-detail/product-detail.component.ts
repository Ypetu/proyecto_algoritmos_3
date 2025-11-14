import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetProductsService } from '../../services/get-products.service';
import { CartService } from '../../services/cart-service.service';
import { Product } from '../../Interfaces/IProducts';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  // Objeto para manejar el estado del carrito por producto
  productsInCart: { [productId: number]: boolean } = {};

  // inyectamos los servicios
  constructor(
    private route: ActivatedRoute,
    private productsService: GetProductsService,
    private cartService: CartService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID del producto desde la ruta:', id);
    
    // si hay id busco producto
    if (id) {

      this.productsService.getProduct(id).subscribe({
      next: (product) => {
        this.product = product;

      },
      error: (err) => {
        console.error('Error al cargar el producto:', err);
      }
    });
  }
}

// Método para manejar el estado del carrito por producto (igual que en product-list)
toggleProductCart(productId: number): void {
  if (!this.product) {
    console.error('No hay producto cargado');
    return;
  }

  // Alternamos el estado del producto accediendo por su ID
  this.productsInCart[productId] = !this.productsInCart[productId];
  
  if (this.productsInCart[productId]) {
    // Si el producto ahora está en el carrito, lo agregamos
    this.cartService.addTocart(this.product);
    console.log(`Producto ${productId} agregado al carrito`);
  } else {
    // Si el producto ya no está en el carrito, lo quitamos
    this.cartService.removeFromCart(productId);
    console.log(`Producto ${productId} eliminado del carrito`);
  }
}

goToCart(): void {
  this.router.navigate(['/carrito']);
}
}
  

    
  

  

