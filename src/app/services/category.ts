import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:8080/api/categories';
  private http = inject(HttpClient);

  // Pedir mis categorías al backend
  getMyCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  // Recibimos un objeto llamado 'categoryData' desde fuera
  createCategory(categoryData: any) {
    // Lo enviamos tal cual al backend
    return this.http.post(this.apiUrl, categoryData);
  }

  DeleteCategory(categoryData: any) {
    // Lo enviamos tal cual al backend
    return this.http.delete(this.apiUrl + '/' + categoryData.id);
  }

  UpdateCategory(categoryData: any) {
    // Lo enviamos tal cual al backend
    return this.http.put(this.apiUrl + '/' + categoryData.id, categoryData);
  }

  getCategoryById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}