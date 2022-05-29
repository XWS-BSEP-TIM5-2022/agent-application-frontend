import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyRegistrationRequest } from 'src/app/model/company-registration-request';
import { User } from 'src/app/model/user';
import { UserClass } from 'src/app/model/user-class';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyService } from 'src/app/services/company.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  constructor(private userService: UserService, private authService: AuthService, private router: Router, private companyService: CompanyService) { }

  user: User;
  visibleUserAcccountSettings: boolean = false;
  requests: CompanyRegistrationRequest[] = [];

  ngOnInit(): void {
    this.loadUserData();
    this.loadAllRequests();
  }

  loadUserData(){
    let username =  localStorage.getItem("user");

    if (username != undefined){
      this.userService.getByUsername(username).subscribe(
        (user: User) => {
        this.user = user;
      })
    }
  }

  loadAllRequests(){
    this.companyService.getAllCompanyRegistrationRequests().subscribe(
      (requests: CompanyRegistrationRequest[]) => {
      this.requests = requests;

        for (let r of this.requests){
          this.userService.getByUserId(r.userId).subscribe(
            (user: UserClass) => {
              r.owner = user;
            })
        }
    }) 
  }

  makeVisibleUserAcccountSettings(){
    this.visibleUserAcccountSettings = !this.visibleUserAcccountSettings
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['']);  
  }

  approve(id: number){
    this.companyService.approveRequest(id).subscribe(
      (data: any) => {
        this.loadAllRequests();
      })
  }
}
