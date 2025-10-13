import { Product } from './IProducts';


export interface CartItem {
  product: Product;      // Toda la información del producto
  quantity: number;      // Cantidad del producto en el carrito
}