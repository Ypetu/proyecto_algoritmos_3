import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserSession, UserLoginRequest } from '../Interfaces/Isession';

// Creo una interfaz con la estructura del usuario que se va a loguear


@Injectable({ providedIn: 'root' })

export class AuthService {
    // useSubjet guarda un BehaviorSubject que puede contener un tipo de dato UserSession o null. Es PRIVADO
  private userSubject = new BehaviorSubject<UserSession | null>(null);

  //Creo un getter observable   del behivor subjet .EL observable  PUBLICO y solo de lectura para los suscriptores.
  get user$(): Observable<UserSession | null> {
    return this.userSubject.asObservable();
  }
 // funcion de login que recibe un request con Email Y Password retorna un booleano
  login(UserLoginRequest: UserLoginRequest): boolean {
    
  // si hay mail y password en el request, emite un nuevo valor en el BehaviorSubject con el email del usuario logueado y retorna true
    if (UserLoginRequest.email && UserLoginRequest.password) {
    // Emito el nuevo valor que tendra el BehaviorSubject (mail d eusuario)
      this.userSubject.next({ email: UserLoginRequest.email });
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
