import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Admin } from '../models/admin';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  url = 'http://127.0.0.1:8000/admin';
  constructor(private http: HttpClient) { }

  getAllAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${this.url}/allAdmins`).pipe(
      map(
        (response: Admin[]) =>{
          const admins : Admin[] = response;
          for (let admin of admins){
            if(!admin.actualites)
            {
              admin.actualites=[];
            }
          }
          return admins;
        }
      )
    );

  }

  getAllSubAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${this.url}/Sous_admins`);
  }

  getAdmin(admin_id: string): Observable<Admin> {
    return this.http.get<Admin>(`${this.url}/${admin_id}`);
  }

  addAdmin(admin: Admin): Observable<Admin> {
    return  this.http.post<Admin>(`${this.url}/signup`, admin);
  }
  updateAdmin(admin_id:string, adminCor: any): Observable<any> {
    return this.http.post<any>(`${this.url}/update/${admin_id}`, adminCor);
  }
  deleteAdmin(admin_id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/deleteAdmin/${admin_id}`)
  }
}
