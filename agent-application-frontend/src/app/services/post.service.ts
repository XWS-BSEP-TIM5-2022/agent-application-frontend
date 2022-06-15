import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DislinktPost } from '../model/dislinkt-post';
import { SuccessMessage } from '../model/success-message';
import { Test } from '../model/test';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  private readonly postPath = environment.dislinkt_backend_api + 'api/post';

  addPost(post: DislinktPost): Observable<SuccessMessage>{   
    return this.http.post<SuccessMessage>(`https://localhost:8080/api/post/jobOffer`, post)    
  }
}
