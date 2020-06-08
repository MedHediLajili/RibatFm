import { Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  url = 'http://127.0.0.1:8000/category';
  categoryWasUpdated = new Subject();
  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}/getcategories`);
  }

  getCategorie(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.url}/${id}`);
  }
  addCategory(category: any): Observable<Category> {
    return  this.http.post<Category>(`${this.url}/create`, category);
  }
  updateCategory(category: Category , formadata: any): Observable<Category> {
    return this.http.post<Category>(`${this.url}/update/${category.id}`, formadata);
  }
  deleteCategory(category_id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/delete/${category_id}`);
  }
}
