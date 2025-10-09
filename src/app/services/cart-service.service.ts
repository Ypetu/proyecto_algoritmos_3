import { Injectable } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { Product } from '../Interfaces/IProducts';  
import { CartItem } from '../Interfaces/IcartItem';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  // creo el array de los productos del carrito
  cartItems: CartItem[] = [];
  // creo un contador para el icono del carrito
  cartCount: number = 0;

  // CREO EL OUTPUT PARA ENVIAR EL CONTADOR AL HEADER

  @Output() cartUpdated = new EventEmitter<number>();


  constructor() { }


  // función para agregar al carrito items (simplificada sin cantidades)
  addTocart(product: Product) {
    // Verifico si el producto ya está en el carrito
    const existingItem = this.cartItems.find(item => item.productId === product.id);

    if (!existingItem) {
      // Si no está en el carrito, lo agrego con cantidad fija de 1
      this.cartItems.push({ productId: product.id, quantity: 1 });
      
      // Incremento el contador del carrito
      this.cartCount += 1;
      
      console.log(`Producto ${product.id} añadido al carrito`);
      console.log('Contador carrito:', this.cartCount);
      
      // Emito el evento con el contador actualizado
      this.cartUpdated.emit(this.cartCount);
    }
  }

  // función para eliminar items del carrito (simplificada)
  removeFromCart(productId: number) {
    const itemIndex = this.cartItems.findIndex(item => item.productId === productId);
    
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.cartCount -= 1;
      console.log(`Producto ${productId} eliminado del carrito`);
      console.log('Contador carrito:', this.cartCount);
      
      // Emito el evento con el contador actualizado
      this.cartUpdated.emit(this.cartCount);
    }
  }
  
  // Método para verificar si un producto está en el carrito
  isInCart(productId: number): boolean {
    return this.cartItems.some(item => item.productId === productId);
  }
}

