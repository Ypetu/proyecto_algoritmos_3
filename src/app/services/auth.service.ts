import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserSession, UserLoginRequest,sessionTokenResponse } from '../Interfaces/Isession';
import { HttpClient } from '@angular/common/http';
import { API_LOGIN } from '../app.config';

// Creo una interfaz con la estructura del usuario que se va a loguear


@Injectable({ providedIn: 'root' })

export class AuthService {
    // useSubjet guarda un BehaviorSubject que puede contener un tipo de dato UserSession o null. Es PRIVADO
  private userSubject = new BehaviorSubject<UserSession | null>(null);
  constructor(private http: HttpClient) {} 

  //Creo un getter observable   del behivor subjet .EL observable  PUBLICO y solo de lectura para los suscriptores.
  get user$(): Observable<UserSession | null> {
    return this.userSubject.asObservable();
  }
 // funcion de login que recibe un request con Email Y Password retorna un booleano
  /*login(UserLoginRequest: UserLoginRequest): boolean {
    
  // si hay mail y password en el request, emite un nuevo valor en el BehaviorSubject con el email del usuario logueado y retorna true
    if (UserLoginRequest.email && UserLoginRequest.password) {
    // Emito el nuevo valor que tendra el BehaviorSubject (mail d eusuario)
      this.userSubject.next({ id: 0, email: UserLoginRequest.email });
      return true;
    }
    return false;
  }*/

  logout(): void {
    this.userSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.userSubject.value !== null;
    
  }


  // la funcion login hace una peticion post a la api de login con el objeto UserLoginRequest y retorna un observable de sessionTokenResponse.
  //Ese token debera ser enviado en las cabeceras de todas las peticiones posteriorers.  VER DONDE ALMACENAR
  login(UserLoginRequest: UserLoginRequest): Observable<sessionTokenResponse> {
    return this.http.post<sessionTokenResponse>(API_LOGIN, UserLoginRequest);
    
  }
}
