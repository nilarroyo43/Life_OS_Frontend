import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  // 1. Buscamos si el usuario tiene una "llave" guardada
  const token = localStorage.getItem('token');

  // 2. Si tiene llave, clonamos la petición y le pegamos el Token en la cabecera
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    
    // Dejamos que la petición clonada continúe su viaje
    return next(clonedRequest);
  }

  // 3. Si no hay llave (ej: está en la pantalla de Login), dejamos que la petición siga normal
  return next(req);
};