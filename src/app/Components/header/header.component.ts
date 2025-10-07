import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { GetProductsService } from '../../services/get-products.service';
import { UserSession } from '../../Interfaces/Isession';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet,ProductListComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  // creo una variable user del tipo UserSession o null e inicializo en null
  user : UserSession | null = null;

  // inyecto el servicio de autenticacion y productos
  constructor(
    private authService: AuthService,
    private router: Router,
    private productsService: GetProductsService
  ) {}

  // me subscribo al observable user$
  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user; // actualizo la variable user con el valor emitido por el observable
      console.log('Usuario en HeaderComponent:', this.user);
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
