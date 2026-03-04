import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // La URL base de tu Backend (Spring Boot)
  private apiUrl = 'http://localhost:8080/api/auth';

  // Inyectamos el HttpClient para poder hacer peticiones
  private http = inject(HttpClient);

  // Método para hacer Login
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((response: any) => {
        // Si el backend nos responde bien, guardamos el Token en el navegador
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.username);
        }
      })
    );
  }

  // Método para cerrar sesión (borrar el token)
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  // Método para saber si estamos logueados o no
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Método para sacar la "llave" cuando la necesitemos
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}