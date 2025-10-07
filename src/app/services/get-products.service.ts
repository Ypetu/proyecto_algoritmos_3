import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_LOGIN, API_PRODUCTS } from '../app.config';
import { Observable } from 'rxjs';
import { Product } from '../Interfaces/IProducts';

@Injectable({
  providedIn: 'root', // Hace que el servicio esté disponible en toda la aplicación
})
export class GetProductsService {
  http = inject(HttpClient); // Inyecta el cliente HTTP para hacer peticiones
  apiUrl = API_PRODUCTS; // Obtiene la URL base de la API desde las variables de entorno
  private LIMIT = 5; // Define un límite de productos por página




getProducts(page: number): Observable<Product[]> { // Método para obtener productos, recibe el número de página
    return this.http.get<any[]>(`${this.apiUrl}`, { // Realiza petición GET a la API de productos
      params: {
        limit: page * this.LIMIT, // Envía el parámetro 'limit' calculado según la página
      },
    });
  }

  getProduct(id: string): Observable<Product> { // Método para obtener un producto por su id
    return this.http.get<Product>(`${this.apiUrl}/${id}`); // Realiza petición GET a la API con el id del producto
  }
}



