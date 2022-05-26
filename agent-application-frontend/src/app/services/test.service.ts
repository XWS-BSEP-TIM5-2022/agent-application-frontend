import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  private readonly testPath = environment.backend_api + 'api/post';   // TODO: kad se novi bekend doda, promeniti environment.backend_api

  getAll(){
    return this.http.get<any>(`${this.testPath}`)    
  }   

}
