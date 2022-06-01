import { CompanyService } from './../../services/company.service';
import { UserService } from './../../services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CompanyRegistrationComponent } from './../company-registration/company-registration.component';
import { CompanyRegistrationRequest } from './../../model/company-registration-request';
import { UserClass } from './../../model/user-class';
import { Company } from './../../model/company';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-company-info',
  templateUrl: './edit-company-info.component.html',
  styleUrls: ['./edit-company-info.component.scss']
})
export class EditCompanyInfoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CompanyRegistrationComponent>, private userService: UserService, private companyService: CompanyService) { }

  user: UserClass;
  userInfo: string;
  request: CompanyRegistrationRequest = new CompanyRegistrationRequest;
  allCompanies: Company[] = [];

  company : Company
  

  ngOnInit(): void {
    this.loadUserData();
    let username =  localStorage.getItem("user");

    // if (username != undefined) {
    //   this.userService.getCompanyByOwnerUsername(username).subscribe(
    //     (data: any) => {
    //       console.log(data)
    //       if (data != null) {
    //         alert("User can send only one request!");
    //         this.dialogRef.close(); 
    //       }
    //     }
    //   );
    // }

    this.loadAllCompanies();
  }

  loadUserData(){
    let username =  localStorage.getItem("user");

    if (username != undefined){
      this.userService.getByUsername(username).subscribe(
        (user: any) => {
        this.user = user;
        this.company = user?.companyDTO
        console.log(user.companyDTO)

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
          if (this.nameIsUnique(this.request.companyDTO.name)){
            this.companyService.saveRegistrationRequest(this.request).subscribe(
              (data: any) => {
                alert("Request for company registation sent!")
                this.dialogRef.close(); 
              }
            )
          } else {
            alert("Company name must be unique!");
          }
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


  editCompanyInfo(){

    if (this.company.name.trim() != "" && this.company.description.trim() != "" && this.company.phoneNumber.trim() != ""){

      if (this.company.phoneNumber[0] == "+"){
        let isnum = /^\d+$/.test(this.company.phoneNumber.substring(this.company.phoneNumber.indexOf('+') + 1));
        if (isnum) {
          if (this.nameIsUnique(this.company.name)){
            this.companyService.updateCompanyInfo(this.company).subscribe(
              (data: any) => {
                alert("Company info edited!!")
                this.dialogRef.close(); 
              }
            )
          }
          else {
            alert("Company name must be unique!");
          }
        }
        else {
          alert("Wrong format for phone number!");
        }
      }else {
        alert("Wrong format for phone number!");
      }
    }
    else {
      alert("All fields must be filled!");
    }
  }

  nameIsUnique(name: string){
    for(let c of this.allCompanies){
      if (c.name == name && this.company.name !== name){
        return false;
      }
    }
    return true;
  }

  loadAllCompanies(){
    this.companyService.getAll().subscribe(
      (data: Company[]) => {
        this.allCompanies = data;
        console.log(this.allCompanies)
      }
    )
  }

  onNoClick(){
    this.dialogRef.close();
  }

}
