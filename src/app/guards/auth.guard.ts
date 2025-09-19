import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // Iyecto el servicio de auntenticacion
  const authService = inject(AuthService); // iyecto dependencias
  const router = inject(Router);

  // Verifico si el usuario esta logueado invocando la funcion del servicio de autenticacion
     if (!authService.isLoggedIn()){
    // Si no esta logueado, redirijo al login
    router.navigate(['/login']);
    return false;   
   }
  return true; // simplemente retorno true para que el guard deje pasar

};
