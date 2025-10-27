import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart-service.service';
import { AuthService } from '../../services/auth.service';
import { UserSession } from '../../Interfaces/Isession';

@Component({
  selector: 'app-payment',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  isProcessing = false;
  currentUser: UserSession | null = null;
  cartTotal = 0;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {
    this.paymentForm = this.createPaymentForm();
  }

  ngOnInit(): void {
    // Obtener usuario actual
    this.authService.user$.subscribe(user => {
      this.currentUser = user;
    });
    
    // Obtener total del carrito
    this.cartTotal = this.cartService.getTotal();
    
    // Si el carrito está vacío, redirigir
    if (this.cartService.getCartItems().length === 0) {
      alert('El carrito está vacío');
      this.router.navigate(['/carrito']);
    }
  }

  private createPaymentForm(): FormGroup {
    return this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      cardholderName: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  // Formatear número de tarjeta
  formatCardNumber(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    value = value.substring(0, 16);
    value = value.replace(/(.{4})/g, '$1 ').trim();
    this.paymentForm.patchValue({ cardNumber: value.replace(/\s/g, '') });
    event.target.value = value;
  }

  // Formatear fecha de vencimiento
  formatExpiryDate(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    event.target.value = value;
    this.paymentForm.patchValue({ expiryDate: value });
  }

  // Confirmar compra
  confirmPurchase(): void {
    if (this.paymentForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    if (!this.currentUser) {
      alert('Error: Usuario no autenticado');
      this.router.navigate(['/login']);
      return;
    }

    this.isProcessing = true;

    const userId = this.currentUser.id?.toString() || 'user123';
    const customerEmail = this.currentUser.email || 'usuario@ejemplo.com';

    this.cartService.createPurchase(userId, customerEmail).subscribe({
      next: (purchase) => {
        console.log('Datos de compra recibidos de MockAPI:', purchase);
        console.log('CompraId generado por MockAPI:', purchase.compraId);
        console.log('UserId del usuario:', purchase.userId);
        
        // Limpiar el carrito
        this.cartService.clearCart();
        
        // Redirigir a la página de confirmación con los datos de la compra
        this.router.navigate(['/purchase-success'], { 
          state: { purchaseData: purchase } 
        });
        
        this.isProcessing = false;
      },
      error: (error) => {
        console.error('Error al crear la compra:', error);
        alert('Error al procesar la compra. Intenta nuevamente.');
        this.isProcessing = false;
      }
    });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.paymentForm.controls).forEach(field => {
      const control = this.paymentForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.paymentForm.get(fieldName);
    if (field?.hasError('required')) return `${fieldName} es requerido`;
    if (field?.hasError('pattern')) {
      switch (fieldName) {
        case 'cardNumber': return 'Debe tener 16 dígitos';
        case 'expiryDate': return 'Formato: MM/YY';
        case 'cvv': return 'Debe tener 3-4 dígitos';
        default: return 'Formato inválido';
      }
    }
    if (field?.hasError('minlength')) return 'Muy corto';
    return '';
  }

  goBack(): void {
    this.router.navigate(['/carrito']);
  }
}
