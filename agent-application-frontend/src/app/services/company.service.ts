import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Company } from '../model/company';
import { CompanyRegistrationRequest } from '../model/company-registration-request';
import { JobOffer } from '../model/job-offer';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  private readonly companyPath = environment.backend_api + 'company';

  getAllJobOffers(){
    return this.http.get<JobOffer[]>(`${this.companyPath}/job_offer`)    
  }

  getCompanyById(id: number){
    return this.http.get<Company>(`${this.companyPath}/`+ id)    
  }

  saveRegistrationRequest(request: CompanyRegistrationRequest){
    return this.http.post<any>(`${this.companyPath}/request_registration`, request)    
  }

  getAllCompanyRegistrationRequests(){
    return this.http.get<CompanyRegistrationRequest[]>(`${this.companyPath}/requests`)    
  }

  approveRequest(requestId: number){
    return this.http.put<any>(`${this.companyPath}/approve_request/`+ requestId, undefined)    
  }

  saveJobOffer(jobOffer: JobOffer){
    return this.http.post<any>(`${this.companyPath}/` + jobOffer.companyId +  `/job_offer`, jobOffer)    
  }

  getAll(){
    return this.http.get<any>(`${this.companyPath}/`)    
  }

  updateCompanyInfo(dto){
    return this.http.put<any>(`${this.companyPath}/updateCompanyInfo`, dto)    
  }
}
