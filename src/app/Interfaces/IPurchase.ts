export interface PurchaseItem {
  productId: number;
  title: string;
  price: number;
  quantity: number;
}

export interface Purchase {
  compraId?: string; // Identificador único generado por MockAPI
  userId: string; // ID del usuario que realiza la compra
  customerEmail: string;
  items: PurchaseItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  date: string;
}

export interface CreatePurchaseRequest {
  userId: string;
  customerEmail: string;
}