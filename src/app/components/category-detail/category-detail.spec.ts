import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [],
  templateUrl: './category-detail.html',
})
export class CategoryDetail implements OnInit {
  
  // 1. Inyectamos el servicio que sabe leer la URL
  private route = inject(ActivatedRoute);
  
  // 2. Creamos una variable para guardar el ID que encontremos
  categoryId: string | null = null;

  ngOnInit() {
    // 3. Le decimos a Angular: "Avísame cuando cambien los parámetros de la URL"
    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('id'); // Extraemos el valor del :id
      console.log('¡Aterrizamos en la categoría con ID:', this.categoryId, '!');
    });
  }
}