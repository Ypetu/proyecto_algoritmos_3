import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart-service.service';
import { CartItem } from '../../Interfaces/IcartItem';

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

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    // Obtenemos los productos del carrito desde el servicio
    this.cartItems = this.cartService.cartItems;
    this.calculateTotal();
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
    this.cartTotal = this.cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }
}