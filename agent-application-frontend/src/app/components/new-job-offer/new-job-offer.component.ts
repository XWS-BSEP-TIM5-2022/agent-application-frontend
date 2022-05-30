import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Company } from 'src/app/model/company';
import { JobOffer } from 'src/app/model/job-offer';
import { UserClass } from 'src/app/model/user-class';
import { CompanyService } from 'src/app/services/company.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-job-offer',
  templateUrl: './new-job-offer.component.html',
  styleUrls: ['./new-job-offer.component.scss']
})
export class NewJobOfferComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewJobOfferComponent>, private userService: UserService, private companyService: CompanyService) { }

  userInfo: string;
  user: UserClass = new UserClass;
  company: Company = new Company;
  jobOffer: JobOffer = new JobOffer;

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
    this.loadCompany();
  }

  loadCompany(){
    let username =  localStorage.getItem("user");

    if (username != undefined) {
      this.userService.getCompanyByOwnerUsername(username).subscribe(
        (data: Company) => {
          this.company = data;
          if (data == null) {
            alert("Company not found!");
            this.dialogRef.close(); 
          }
        }
      );
    }
  }

  saveJobOffer(){
    this.jobOffer.companyId = this.company.id;

    if (this.jobOffer.position.name.trim() != "" && this.jobOffer.position.pay != 0 && 
        this.jobOffer.dailyActivities.trim() != "" && this.jobOffer.preconditions.trim() != "" && 
        this.jobOffer.jobDescription.trim() != "") {

          var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
          let isnum = /^\d+$/.test(this.jobOffer.position.name);

          if (format.test(this.jobOffer.position.name) || isnum){ // provera da li 'name' polje sadrzi specijalni karakter ili broj
            alert("Position name can not include special characters or numbers!")
          } else {
            if (!isNaN(this.jobOffer.position.pay)) {   // provera da li je 'pay' polje tipa number
              if (this.jobOffer.position.pay >= 100) {
                this.companyService.saveJobOffer(this.jobOffer).subscribe(
                  (data: any) => {
                    alert("New job offer successfully created!")
                    this.dialogRef.close();
                  }
                );
              } else {
                alert("Pay must be above 100!");
              }
            }
            else {
              alert("Pay field must be numeric value!");
            }
          }
    } else {
      alert("All fields must be filled!");
    }
  }

  onNoClick(){
    this.dialogRef.close();
  }
}
