import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserSession } from '../../Interfaces/Isession';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  // creo una variable user del tipo UserSession o null e inicializo en null
  user : UserSession | null = null;

  // inyecto el servicio de autenticacion
  constructor(private authService: AuthService ,private router: Router) {}

  // me subscribo al observable user$
  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user; // actualizo la variable user con el valor emitido por el observable
      console.log('Usuario en HomeComponent:', this.user);
    });
  }

  logOut(event?: Event) {
    //prevengo el comportamiento por defecto del evento click
    if (event) event.preventDefault();
    //INVOCO EL METODO LOGOUT DEL SERVICIO DE AUTENTICACION
    this.authService.logout();  
    this.router.navigate(['/login']); // FUERZO AL LOGiN
  }
}   
