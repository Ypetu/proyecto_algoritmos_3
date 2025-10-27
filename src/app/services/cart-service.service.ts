import { Injectable } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../Interfaces/IProducts';  
import { CartItem } from '../Interfaces/IcartItem';
import { Purchase, CreatePurchaseRequest } from '../Interfaces/IPurchase';
import { API_COMPRAS } from '../app.config';

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

  // URL del endpoint de MockAPI
  private apiUrl = API_COMPRAS;

  constructor(private http: HttpClient) { }


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
  }

  // Método para obtener el total del carrito
  getTotal(): number {
    return this.cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }

  // Método para obtener los items del carrito
  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  // Método para limpiar el carrito después de una compra exitosa
  clearCart(): void {
    this.cartItems = [];
    this.cartCount = 0;
    this.cartUpdated.emit(this.cartCount);
  }

  // Método para crear una compra en MockAPI
  createPurchase(userId: string, customerEmail: string): Observable<Purchase> {
    const purchaseData = {
      userId: userId,
      customerEmail: customerEmail,
      items: this.cartItems.map(item => ({
        productId: item.product.id,
        title: item.product.title,
        price: item.product.price,
        quantity: item.quantity
      })),
      total: this.getTotal(),
      status: 'completed',
      date: new Date().toISOString()
    };

    return this.http.post<Purchase>(this.apiUrl, purchaseData);
  }

  // Método para obtener el historial de compras de un usuario
  getPurchaseHistory(userId: string): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(`${this.apiUrl}?userId=${userId}`);
  }

  // Método para obtener todas las compras (admin)
  getAllPurchases(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(this.apiUrl);
  }

  // Método para obtener una compra específica por ID
  getPurchaseById(purchaseId: string): Observable<Purchase> {
    return this.http.get<Purchase>(`${this.apiUrl}/${purchaseId}`);
  }

}


