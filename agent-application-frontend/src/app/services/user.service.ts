import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { UserClass } from '../model/user-class';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private readonly userPath = environment.backend_api + 'users';

  getByUsername(username: string){
    return this.http.get<any>(`${this.userPath}/`+ username)    
  }

  getCompanyByOwnerUsername(username: string){
    return this.http.get<any>(`${this.userPath}/`+ username + `/company`)    
  }

  getByUserId(id: number){
    return this.http.get<UserClass>(`${this.userPath}/id/`+ id)    
  }
}
