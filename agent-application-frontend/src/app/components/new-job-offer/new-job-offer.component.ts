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

    console.log(this.jobOffer)

    this.companyService.saveJobOffer(this.jobOffer).subscribe(
      (data: any) => {
        alert("New job offer successfully created!")
        this.dialogRef.close();
      }
    );
  }

  onNoClick(){
    this.dialogRef.close();
  }
}
