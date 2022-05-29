import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  private readonly headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  private readonly getAllByCompanyId = environment.backend_api + 'comments/company/';
  private readonly getAllSalaryCommentsByCompanyIdPath = environment.backend_api + 'comments/salary/company/';
  private readonly getAllInterviewCommentsByCompanyIdPath = environment.backend_api + 'comments/interview/company/';
  private readonly getAllPositionsByCompanyIdPath = environment.backend_api + 'comments/company/'; 
  private readonly leaveCommentPath = environment.backend_api + 'comments'; 
  private readonly leaveSalaryCommentPath = environment.backend_api + 'comments/salary'; 
  private readonly leaveInterviewCommentPath = environment.backend_api + 'comments/interview'; 

  getAllCompanyComments(comanyId: number){
    return this.http.get<any>(`${this.getAllByCompanyId}` + comanyId);    
  }

  getAllSalaryCommentsByCompanyId(companyId: number) {
    return this.http.get<any>(`${this.getAllSalaryCommentsByCompanyIdPath}` + companyId)
  }

  getAllInterviewCommentsByCompanyId(companyId: number) {
    return this.http.get<any>(`${this.getAllInterviewCommentsByCompanyIdPath}` + companyId)
  }
  getAllPositionsByCompanyId(companyId: number) {
    return this.http.get<any>(`${this.getAllPositionsByCompanyIdPath}` + companyId + "/positions")
  }

  leaveComment(body){
    return this.http.post<any>(`${this.leaveCommentPath}`, JSON.stringify(body), {'headers': this.headers})
  }

  leaveSalaryComment(body){
    return this.http.post<any>(`${this.leaveSalaryCommentPath}`, JSON.stringify(body), {'headers': this.headers})
  }

  leaveInterviewComment(body){
    return this.http.post<any>(`${this.leaveInterviewCommentPath}`, JSON.stringify(body), {'headers': this.headers})
  }


}
