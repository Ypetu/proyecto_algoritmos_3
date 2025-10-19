import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'login',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'product-list',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'nosotros',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'carrito',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'product-detail/**',
    renderMode: RenderMode.Prerender
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
