import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Purchase } from '../../Interfaces/IPurchase';

@Component({
  selector: 'app-purchase-success',
  imports: [CommonModule],
  templateUrl: './purchase-success.component.html',
  styleUrl: './purchase-success.component.scss'
})
export class PurchaseSuccessComponent implements OnInit {
  purchase: Purchase | null = null;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener los datos de la compra desde la navegación
    const navigation = this.router.getCurrentNavigation();
    const purchaseData = navigation?.extras?.state?.['purchaseData'] as Purchase;
    
    if (purchaseData) {
      // Usar los datos reales de la compra
      console.log('Datos de compra recibidos en purchase-success:', purchaseData);
      console.log('CompraId:', purchaseData.compraId);
      console.log('UserId:', purchaseData.userId);
      this.purchase = purchaseData;
      this.isLoading = false;
    } else {
      // Fallback: intentar obtener desde el historial de navegación
      const state = history.state;
      console.log('Estado del historial:', state);
      if (state && state.purchaseData) {
        console.log('Datos desde historial:', state.purchaseData);
        this.purchase = state.purchaseData;
        this.isLoading = false;
      } else {
        // Si no hay datos, redirigir al carrito
        console.warn('No se encontraron datos de compra, redirigiendo al carrito');
        this.router.navigate(['/carrito']);
        return;
      }
    }
  }

  calculateSubtotal(): number {
    if (!this.purchase) return 0;
    return this.purchase.items.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
  }

  calculateTax(): number {
    const subtotal = this.calculateSubtotal();
    return subtotal * 0.21; // 21% IVA
  }

  goToProducts(): void {
    this.router.navigate(['/product-list']);
  }


  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
