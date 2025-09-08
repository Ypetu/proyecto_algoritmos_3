import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UserSession {
  email: string;
  token?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<UserSession | null>(null);

  get user$(): Observable<UserSession | null> {
    return this.userSubject.asObservable();
  }

  login(email: string, password: string): boolean {
    // Aquí iría la lógica real de autenticación (API, etc.)
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
