import { Injectable } from '@angular/core';

@Injectable({
  // hago accesible al servicio desde cualquier parte de la app
  providedIn: 'root'
})
export class ErrorMessagesService {
  getErrorMessage(errorKey: string | null): string {
    switch (errorKey) {
      case 'required':
        return 'El campo es obligatorio.';
      case 'customEmailError':
        return 'El email no es válido.';
      case 'customPasswordError':
        return 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.';
      default:
        return '';
    }
  }
}
