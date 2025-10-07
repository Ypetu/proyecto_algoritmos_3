import { Routes } from '@angular/router';
import { HeaderComponent } from './Components/header/header.component';
import { LogInComponent } from './Components/log-in/log-in.component';
import { NosotrosComponent } from './Components/nosotros/nosotros.component';
import { authGuard } from './guards/auth.guard';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { ProductDetailComponent } from './Components/product-detail/product-detail.component';



// defino las rutas de la aplicacion

export const routes: Routes = [

    // Publicas
  { path: 'login', component: LogInComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // si no hay path redirijo a login
    
    // Protegidas -- solo accesibles si el usuario esta logueado
    // header primero y todas como children
  { 
    path: '', 
    component: HeaderComponent, 
    canActivate: [authGuard],
    children: [
      { path: 'product-list', component: ProductListComponent },
      { path: 'product-detail/:id', component: ProductDetailComponent },
      { path: 'nosotros', component: NosotrosComponent },
      { path: 'home', redirectTo: 'product-list', pathMatch: 'full' }
    ]
  }
];

