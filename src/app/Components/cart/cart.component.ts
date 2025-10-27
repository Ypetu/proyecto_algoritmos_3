import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart-service.service';
import { CartItem } from '../../Interfaces/IcartItem';
import { AuthService } from '../../services/auth.service';
import { UserSession } from '../../Interfaces/Isession';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  // Lista de productos en el carrito
  cartItems: CartItem[] = [];
  
  // Total del carrito
  cartTotal: number = 0;
  
  // Estado de procesamiento
  isProcessing: boolean = false;
  
  // Usuario actual
  currentUser: UserSession | null = null;

  constructor(
    private cartService: CartService, 
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Obtenemos los productos del carrito desde el servicio
    this.cartItems = this.cartService.cartItems;
    this.calculateTotal();
    
    // Obtenemos el usuario actual
    this.authService.user$.subscribe(user => {
      this.currentUser = user;
    });
  }

  // Método para eliminar un producto del carrito
  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
    // Actualizamos la lista local
    this.cartItems = this.cartService.cartItems;
    this.calculateTotal();
  }

  // Método para actualizar la cantidad de un producto
  updateQuantity(productId: number, newQuantity: number): void {
    this.cartService.modifyQuantity(productId, newQuantity);
    // Actualizamos la lista local
    this.cartItems = this.cartService.cartItems;
    this.calculateTotal();
  }

  // Calcula el total del carrito
  calculateTotal(): void {
    //funcion reduce para sumar los totales por cada item
    this.cartTotal = this.cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }

  // Método para proceder al pago
  proceedToPayment(): void {
    // Verificar que hay items en el carrito
    if (this.cartItems.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    // Verificar que el usuario está logueado
    if (!this.currentUser) {
      alert('Debes estar logueado para realizar una compra');
      this.router.navigate(['/login']);
      return;
    }

    // Navegar al componente de payment
    this.router.navigate(['/payment']);
  }

}