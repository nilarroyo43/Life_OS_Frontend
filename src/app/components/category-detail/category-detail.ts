import { Component, inject } from '@angular/core';
import { CategoryService } from '../../services/category';

@Component({
  selector: 'app-category-detail',
  imports: [],
  templateUrl: './category-detail.html',
})
export class CategoryDetail {
  title = 'Detalle de Categoría';
  description = 'Aquí podrás ver y editar los detalles de tu categoría.';
  status = 'PENDING'; // PENDING, IN_PROGRESS, DONE, ARCHIVED
  startDate = new Date();
  endDate = new Date();
  categoryId = 0; // EL DATO CLAVE  
  categories: any[] = [];
  private categoryService = inject(CategoryService);


  loadCategories() {
    this.categoryService.getMyCategories().subscribe((data: any[]) => {
      this.categories = data; 
      console.log('Categorías cargadas:', this.categories);
    });
  }
}
