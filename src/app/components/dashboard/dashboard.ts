import { Component, inject } from '@angular/core';
import { CategoryService } from '../../services/category';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './dashboard.html',
})
export class DashboardComponent {
  
  username = '';
  empty_message = 'No hay categorías creadas aun.';
  categories: any[] = []; 

  newCategoryName = '';
  newCategoryDesc = '';
  newCategoryColor = '';
  newCategoryHasTimeTracking = false;
  
  private categoryService = inject(CategoryService);

  ngOnInit() {
   this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getMyCategories().subscribe(data => {
      this.categories = data; 
      console.log('Categorías cargadas:', this.categories);
    });
  }

  onCrearCategoria() {
    // 1. Preparamos el "paquete" con la sintaxis exacta que pide tu Backend
    const categoryData = {
      name: this.newCategoryName,
      description: this.newCategoryDesc,
      hasTimeTracking: this.newCategoryHasTimeTracking,
      color: this.newCategoryColor || '#4f46e5' // Un color por defecto si no se seleccionó uno
    };

    // 2. Se lo damos al servicio (al repartidor)
    this.categoryService.createCategory(categoryData).subscribe(response => {
      console.log('¡Categoría creada!', response);
      
      // 3. Limpiamos el formulario
      this.newCategoryName = '';
      this.newCategoryDesc = '';
      this.newCategoryColor = '';
      this.newCategoryHasTimeTracking = false;
      
      // 4. Recargamos la lista para que aparezca en pantalla
      this.loadCategories();
    });
  }
  onDeleteCategory(category: any) {
    if (confirm(`¿Estás seguro de que quieres eliminar la categoría "${category.name}"?`)) {
      this.categoryService.DeleteCategory(category).subscribe(response => {
        console.log('¡Categoría eliminada!', response);
        this.loadCategories(); // Recargamos la lista para actualizar la pantalla
      });
    }
  }
}