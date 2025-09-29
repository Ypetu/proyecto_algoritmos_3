import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserSession, UserLoginRequest,AuthLoginResponse } from '../Interfaces/Isession';
import { HttpClient } from '@angular/common/http';
import { API_LOGIN,API_KEY } from '../app.config';
import { HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';





@Injectable({ providedIn: 'root' })


export class AuthService {
    // useSubjet guarda un BehaviorSubject que puede contener un tipo de dato UserSession o null. Es PRIVADO
  private userSubject = new BehaviorSubject<UserSession | null>(null);
  
  constructor(private http: HttpClient) {
    // Busco usuario en el localStorage
    const userJson = localStorage.getItem('user');
  if (userJson) {
    const user: UserSession = JSON.parse(userJson);// guardo en user el usuario parseado
    this.userSubject.next(user); // actualizo el userSubject con el usuario almacenado
  }
  }

  //Creo un getter observable   del behivor subjet .EL observable  PUBLICO y solo de lectura para los suscriptores.
  get user$(): Observable<UserSession | null> {
    return this.userSubject.asObservable();
  }
 

  logout(): void {

    // paso el BehaviorSubject a null
    // Borro los datos del localStorage
    this.userSubject.next(null);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  


  // la funcion login hace una peticion post a la api de login con el objeto UserLoginRequest y retorna un observable de sessionTokenResponse.
  //Ese token debera ser enviado en las cabeceras de todas las peticiones posteriorers.  VER DONDE ALMACENAR
  login(UserLoginRequest: UserLoginRequest): Observable<AuthLoginResponse> {
    const headers = new HttpHeaders({
      'x-api-key': API_KEY
    });
    return this.http.post<AuthLoginResponse>(API_LOGIN, UserLoginRequest, { headers }).pipe(
      tap(session => {
        //actualizo el userSuibjetect
        this.userSubject.next(session.user);
        // Guardo usuario y token en localStorage
        localStorage.setItem('user', JSON.stringify(session.user));
        localStorage.setItem('accessToken', session.accessToken);
     if (UserLoginRequest.rememberMe){ // si el usuario quiere que lo recuerde guardo el refreshToken
         localStorage.setItem('refreshToken', session.refreshToken);
     }
      })
    );
  }
}