import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CompanyRegistrationRequest } from 'src/app/model/company-registration-request';
import { User } from 'src/app/model/user';
import { UserClass } from 'src/app/model/user-class';
import { CompanyService } from 'src/app/services/company.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.scss']
})
export class CompanyRegistrationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CompanyRegistrationComponent>, private userService: UserService, private companyService: CompanyService) { }

  user: UserClass;
  userInfo: string;
  request: CompanyRegistrationRequest = new CompanyRegistrationRequest;

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(){
    let username =  localStorage.getItem("user");

    if (username != undefined){
      this.userService.getByUsername(username).subscribe(
        (user: UserClass) => {
        this.user = user;
        this.userInfo = this.user.firstName + " " + this.user.lastName;
      })
    }
  }

  onNoClick(){
    this.dialogRef.close();
  }

  requestCompanyRegistration(){
    this.request.userId = this.user.id;

    console.log(this.request.companyDTO)

    this.companyService.saveRegistrationRequest(this.request).subscribe(
      (data: any) => {
        alert("Request for company registation sent!")
        this.dialogRef.close(); 
      }
    )
  }
}
