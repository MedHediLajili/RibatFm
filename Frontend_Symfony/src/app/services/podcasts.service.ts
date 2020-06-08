import { Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs';
import {Podcast} from '../models/podcast';


@Injectable({
  providedIn: 'root'
})
export class PodcastsService {
  url = 'http://127.0.0.1:8000/podcast';
  podcastWasUpdated = new Subject();
  constructor(private http: HttpClient) { }

  getAllPodcasts(): Observable<Podcast[]> {
    return this.http.get<Podcast[]>(`${this.url}/getAllPodcast`);
  }
  addPodcast(podcast: any): Observable<Podcast> {
    return  this.http.post<Podcast>(`${this.url}/createpodcast`, podcast);
  }
  updatePodcast(podcast: Podcast, formdata:any): Observable<Podcast> {
    return this.http.post<Podcast>(`${this.url}/updatepodcast/${podcast.id}`, formdata);
  }
  deletePodcast(podcast_id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/delete/${podcast_id}`);
  }


}


