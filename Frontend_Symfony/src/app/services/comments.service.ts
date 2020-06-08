import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Comment } from 'src/app/models/comment';
@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  url = 'http://127.0.0.1:8000/comment';
  constructor(private http: HttpClient) { }

  getAllComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.url}/allComments`);
  }

  deleteComment(id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/deleteComment/${id}`)
  }
}
