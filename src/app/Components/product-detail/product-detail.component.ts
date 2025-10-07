import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetProductsService } from '../../services/get-products.service';
import { Product } from '../../Interfaces/IProducts';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;


  // inyectamos los servicios
  constructor(
    private route: ActivatedRoute,
    private productsService: GetProductsService
  ) {}
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID del producto desde la ruta:', id);
    
    // si hay id busco producto
    if (id) {

      this.productsService.getProduct(id).subscribe({
      next: (product) => {
        this.product = product;

      },
      error: (err) => {
        console.error('Error al cargar el producto:', err);
 
  
      }
    });
  }}}
  

    
  

  

