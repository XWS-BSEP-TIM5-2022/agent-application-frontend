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
    let username =  localStorage.getItem("user");

    if (username != undefined) {
      this.userService.getCompanyByOwnerUsername(username).subscribe(
        (data: any) => {
          console.log(data)
          if (data != null) {
            alert("User can send only one request!");
            this.dialogRef.close(); 
          }
        }
      );
    }
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

  requestCompanyRegistration(){
    this.request.userId = this.user.id;
  
    if (this.request.companyDTO.name.trim() != "" && this.request.companyDTO.description.trim() != "" && this.request.companyDTO.phoneNumber.trim() != ""){
      
      // broj telefona pocinje znakom '+', a zatim mogu biti samo cifre
      if (this.request.companyDTO.phoneNumber[0] == "+"){
        let isnum = /^\d+$/.test(this.request.companyDTO.phoneNumber.substring(this.request.companyDTO.phoneNumber.indexOf('+') + 1));
        if (isnum) {
          this.companyService.saveRegistrationRequest(this.request).subscribe(
            (data: any) => {
              alert("Request for company registation sent!")
              this.dialogRef.close(); 
            }
          )
       } else {
        alert("Wrong format for phone number!");
       }
      } else  {
        alert("Wrong format for phone number!");
      }
    } else {
      alert("All fields must be filled!");
    }
  }

  onNoClick(){
    this.dialogRef.close();
  }
}
