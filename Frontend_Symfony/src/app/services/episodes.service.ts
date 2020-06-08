import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Episode} from '../models/episode';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {
  url = 'http://127.0.0.1:8000/episode';
  constructor(private http: HttpClient) { }
  
  getAllEpisodes(): Observable<Episode[]> {
    return this.http.get<Episode[]>(`${this.url}/getepisodes`);
  }
  addEpisode(episode: any, id_podcast:string): Observable<any> {
    return  this.http.post<any>(`${this.url}/createEpisode/${id_podcast}`, episode);
  }

  getEpisode(episode_id: string): Observable<Episode> {
    return this.http.get<Episode>(`${this.url}/${episode_id}`);
  }
  updateEpisode(formdata: any, id_episode:string): Observable<any> {
    return this.http.post<any>(`${this.url}/update/${id_episode}`, formdata);
  }
  deleteEpisode(episode_id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/deleteEpisode/${episode_id}`)
  }
}
