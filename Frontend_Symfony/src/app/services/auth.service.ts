import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Admin } from '../models/admin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://127.0.0.1:8000/admin';
  /*
  {
  admin_id: "5ebc87d4a831a30cdcf49c51"
  exp: 1589887440
  iat: 1589671440
  nom: "hedi"
  role: "admin"
  prenom: "ffjkfjk"
  }
  */
 adminAuth: Admin;
  constructor(private http: HttpClient) { }

  signUpAdmin(admin: any): Observable<Admin> {
    return  this.http.post<Admin>(`${this.url}/signup`, admin);
  }

  signInAdmin(adminCor: any): Observable<Admin> {
    return this.http.post<Admin>(`${this.url}/login`, adminCor);
  }

  loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null ;
  }

  logOut(): void{
    localStorage.removeItem('user_id');
    localStorage.removeItem('nom_user');
    localStorage.removeItem('prenom_user');
    localStorage.removeItem('role_user');
  }


  /*getTokenClaims(token: any){
    this.token = token;
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    var tokenInfo = JSON.parse(window.atob(base64));
    this.adminsService.getAdmin(tokenInfo.admin_id).subscribe(
      (data) =>{
        this.initializerAdminAuth(data);
      }
    );
  
  }



  allowAddSubAdmin():boolean{
    return this.adminAuth.role == 'admin';
  }
*/
  initializeLocalStorage(id: string, nom: string, prenom:string, role: string): void{
    localStorage.setItem('user_id', id);
    localStorage.setItem('nom_user', nom);
    localStorage.setItem('prenom_user', prenom);
    localStorage.setItem('role_user', role);
  }
  
  initializerAdminAuth(admin: Admin): void{
      this.adminAuth = admin;
  }


}
