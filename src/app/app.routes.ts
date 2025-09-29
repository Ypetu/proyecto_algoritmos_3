import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LogInComponent } from './Components/log-in/log-in.component';
import { ProductosComponent } from './Components/productos/productos.component';
import { authGuard } from './guards/auth.guard';



// defino als rutas de la aplicacion

export const routes: Routes = [

    // Publicas
  { path: 'login', component: LogInComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // si no hay path redirijo a login
    
    // Protegidas
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'productos', component: ProductosComponent, canActivate: [authGuard] }
];

