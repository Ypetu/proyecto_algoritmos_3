import { Product } from './IProducts';

export interface CartItem {
  productId: number;     // ID del producto
  quantity: number;      // Cantidad del producto en el carrito
}

export interface CartItemDetail {
  product: Product;      // Toda la información del producto
  quantity: number;      // Cantidad del producto en el carrito
}