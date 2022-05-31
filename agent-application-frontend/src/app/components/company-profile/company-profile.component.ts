import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/model/company';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { CompanyService } from 'src/app/services/company.service';
import { UserService } from 'src/app/services/user.service';
import { DialogLeaveComment } from './dialog-comments/dialog-data';
import { DialogEnterInterview } from './dialog-interviews/dialog-data';
import { DialogEnterSalary } from './dialog-salary/dialog-data';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {

  constructor(private companyService: CompanyService,
              private _route: ActivatedRoute,
              private userService: UserService,
              private authService: AuthService,
              private router: Router,
              public dialog: MatDialog,
              private commentService: CommentService) { }

  id: number;
  company: Company;
  user: User;
  role: string;
  visibleUserAcccountSettings: boolean = false;
  isUserCompanyOwner: boolean = false;

  visibleProfile: boolean = false;
  visibleSalary: boolean = false;
  visibleComments: boolean = true;
  visibleInterviews: boolean = false;

  comments: any;
  salaryComments: any;
  interviewComments: any;
  positions: any;

  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number = -1;
  star: number = -1;

  countStar(star) {
    this.selectedValue = star;
  }

  ngOnInit(): void {
    this.loadCompanyData();
    this.loadUserData();
    this.loadCompanyComments();
    this.loadSalaryComments();
    this.loadInterviewComments();
    this.loadPositions();
  }

  loadPositions() { 
    this.commentService.getAllPositionsByCompanyId(this.id).subscribe(res => { this.positions = res})
  }

  loadInterviewComments() {
    this.commentService.getAllInterviewCommentsByCompanyId(this.id).subscribe(res => { this.interviewComments = res})
  }

  loadSalaryComments() {
    this.commentService.getAllSalaryCommentsByCompanyId(this.id).subscribe(res => { this.salaryComments = res})
  }

  loadCompanyComments() {
    this.commentService.getAllCompanyComments(this.id).subscribe(res => this.comments = res)
  }

  loadCompanyData(){
    this.id = parseInt(this._route.snapshot.paramMap.get('id')!);
    this.companyService.getCompanyById(this.id).subscribe(res => {this.company = res;})
  }

  loadUserData(){
    let username =  localStorage.getItem("user");
    let role =  localStorage.getItem("role");    

    if (role != undefined){
      this.role = role
    }

    if (username != undefined){
      this.userService.getByUsername(username).subscribe(
        (user) => {
          this.user = user;
          if(user.companyDTO.id == this.id) {
            this.isUserCompanyOwner = true;
          }
      })
    }

    if (role == "ROLE_COMPANY_OWNER" && username != undefined){
      this.userService.getCompanyByOwnerUsername(username).subscribe(
        (company: Company) => {
        this.company = company;
      })
    }
  }

  makeVisibleUserAcccountSettings(){
    this.visibleUserAcccountSettings = !this.visibleUserAcccountSettings
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['']);  
  }

  changeVisibleProfile() {
    this.visibleSalary = false;
    this.visibleComments = false;
    this.visibleInterviews = false;
    this.visibleProfile = true;
  }

  changeVisibleComments() {
    this.visibleSalary = false;
    this.visibleComments = true;
    this.visibleInterviews = false;
    this.visibleProfile = false;
  }

  changeVisibleSalary() {
    this.visibleSalary = true;
    this.visibleComments = false;
    this.visibleInterviews = false;
    this.visibleProfile = false;
  }

  changeVisibleInterviews() {
    this.visibleSalary = false;
    this.visibleComments = false;
    this.visibleInterviews = true;
    this.visibleProfile = false;
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogLeaveComment, {
      width: '500px',
      data: { comanyId: this.id, positions: this.positions },
    });

    dialogRef.afterClosed().subscribe(result => {
      let body = {
        "title": result.title,
        "content": result.content,
        "companyId": this.id,
        "rating": result.rating.toString(),
        "position": result.position,
      }
      this.commentService.leaveComment(body).subscribe( 
        data => {
          this.loadCompanyComments();
        }, 
        err => {
          alert(err.message);
        }
      );
    });
  }

  openDialogSalary() {
    const dialogRef = this.dialog.open(DialogEnterSalary, {
      width: '500px',
      data: {positions: this.positions},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      let body = {
        "position": result.position,
        "pay": result.pay,
        "companyId": this.company.id,
        "isFormerEmployee": result.isFormerEmployee,
        "bonus" : result.bonus,
        "fairPay" : result.fairPay,
      }
      this.commentService.leaveSalaryComment(body).subscribe( 
        data => {
          this.loadSalaryComments();
        }, 
        err => {
          console.log(err)
          alert(err.message);
        }
      );
    })
  }

  openDialogInterview() {
    const dialogRef = this.dialog.open(DialogEnterInterview, {
      width: '500px',
      data: {positions: this.positions},
    });

    dialogRef.afterClosed().subscribe(result => {
      let body = {
        "title": result.title,
        "position": result.position,
        "hrInterview": result.hrInterview,
        "technicalInterview": result.technicalInterview,
        "companyId": this.id,
        "rating": result.rating.toString(),
      }
      this.commentService.leaveInterviewComment(body).subscribe( 
        data => {
          this.loadInterviewComments();
        }, 
        err => {
          alert(err.message);
        }
      );
    })
  }
}
