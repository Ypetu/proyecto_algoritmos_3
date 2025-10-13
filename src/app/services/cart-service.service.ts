import { Injectable } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { Product } from '../Interfaces/IProducts';  
import { CartItem } from '../Interfaces/IcartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

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
    const existingItem = this.cartItems.find(item => item.product.id === product.id);

    if (!existingItem) {
      // Si no está en el carrito, lo agrego con cantidad fija de 1
      this.cartItems.push({ product, quantity: 1 });
      
      // Incremento el contador del carrito
      this.cartCount += 1;
      
      console.log(`Producto ${product.id} añadido al carrito`);
      console.log('Contador carrito:', this.cartCount);
      
      // Emito el evento con el contador actualizado
      this.cartUpdated.emit(this.cartCount);
    }
  }

  // función para eliminar items del carrito
  
  removeFromCart(productId: number) {
    // Busco el índice del producto en el carrito
    const itemIndex = this.cartItems.findIndex(item => item.product.id === productId);
    // Si lo encuentro, lo elimino del array y decremento el contador
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
    return this.cartItems.some(item => item.product.id === productId);
  }
  
  modifyQuantity(productId: number, quantity: number) {
    // Aseguramos que la cantidad sea al menos 1
    if (quantity < 1) quantity = 1;
    // Y máximo 10 por producto
    if (quantity > 10) quantity = 10;
    // busco el producto en el carrito
    
    const item = this.cartItems.find(item => item.product.id === productId);
    if (item) {
      // si lo encuentro modifico la cantidad
      item.quantity = quantity;
      console.log(`Cantidad del producto ${productId} modificada a ${quantity}`);
      
      // No cambiamos el contador del carrito porque solo cambió la cantidad, no el número de productos
      // Pero notificamos el cambio para actualizar la UI
      this.cartUpdated.emit(this.cartCount);
    }
  }  }


