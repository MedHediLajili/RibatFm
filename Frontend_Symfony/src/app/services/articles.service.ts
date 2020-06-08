import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Actualite } from '../models/actualite';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  url = 'http://localhost:8000/actualite/';
  constructor(private http: HttpClient) { }
  
  getAllArticles(): Observable<Actualite[]> {
    return this.http.get<Actualite[]>(`${this.url}actualites`);
  }

  get8Articles(): Observable<Actualite[]> {
    return this.http.get<Actualite[]>(`${this.url}news`);
  }

  get6Articles(): Observable<Actualite[]> {
    return this.http.get<Actualite[]>(`${this.url}newslast6`);
  }

  getFirst3Articles(): Observable<Actualite[]> {
    return this.http.get<Actualite[]>(`${this.url}newsfirst3`);
  }

  get2ArticlesByCategorie(idcategory :string): Observable<Actualite[]>{
    return this.http.get<Actualite[]>(`${this.url}${idcategory}/getAllActualitesByCategory`);
  }

  addArticle(id_admin: string, id_category:string ,Article: any): Observable<any> {
    return  this.http.post<any>(`${this.url}create/${id_admin}/${id_category}`, Article);
  }
  getArticle(Article_id: string): Observable<Actualite> {
    return this.http.get<Actualite>(`${this.url}${Article_id}`);
  }
  updateArticle(formdata: any, actualite_id:string, admin_id: string): Observable<any> {
    return this.http.post<any>(`${this.url}update/${actualite_id}/${admin_id}`, formdata);
  }
  deleteArticle(Article_id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}delete/${Article_id}`)
  }
}
