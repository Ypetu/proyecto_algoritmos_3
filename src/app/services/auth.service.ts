import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Creo una interfaz con la estructura del usuario que se va a loguear
export interface UserSession {
  email: string;
  token?: string;
}

@Injectable({ providedIn: 'root' })

export class AuthService {
    // useSubjet guarda un BehaviorSubject que puede contener un tipo de dato UserSession o null
  private userSubject = new BehaviorSubject<UserSession | null>(null);

  //observable que emite el valor actual del usuario logueado o null si no hay ninguno. es PUBLICO y solo de lectura para los suscriptores.
  get user$(): Observable<UserSession | null> {
    return this.userSubject.asObservable();
  }
 // funcion d elogin que recibe email y password y retorna un booleano
  login(email: string, password: string): boolean {
    //aca va la logica de autenticacion real  para hacerlos escalable deberia invocar una api
    
    // Por ahora, simula login exitoso si email y password no están vacíos
    if (email && password) {
      this.userSubject.next({ email });
      return true;
    }
    return false;
  }

  logout(): void {
    this.userSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.userSubject.value !== null;
  }
}
