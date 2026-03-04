import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule], // Fundamental para leer los inputs del HTML
  templateUrl: './login.html'
})
export class LoginComponent {
  // Variables que conectaremos al HTML
  username = '';
  password = '';
  errorMessage = '';

  // Inyectamos las herramientas que necesitamos
  private authService = inject(AuthService);
  private router = inject(Router);

  // Función que se ejecuta al darle al botón de Entrar
  onSubmit() {
    this.errorMessage = ''; // Limpiamos errores

    // Llamamos a nuestro "repartidor" (el Service)
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        console.log('¡Login exitoso! Token guardado.');
        // Aquí luego le diremos: this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = 'Usuario o contraseña incorrectos.';
        console.error(err);
      }
    });
  }
}