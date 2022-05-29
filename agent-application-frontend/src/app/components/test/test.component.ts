import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogLeaveComment } from './dialog-comments/dialog-data';
import { DialogEnterSalary } from './dialog-salary/dialog-data';
import { DialogEnterInterview } from './dialog-interviews/dialog-data';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private testService: TestService, private http: HttpClient, public dialog: MatDialog) { }

  private readonly getAllPositionsByCompanyId = environment.backend_api + 'comments/company/'; 
  private readonly getAllByCompanyId = environment.backend_api + 'comments/company/';
  private readonly getAllSalaryCommentsByCompanyId = environment.backend_api + 'comments/salary/company/';
  private readonly getAllInterviewCommentsByCompanyId = environment.backend_api + 'comments/interview/company/';
  private readonly leaveComment = environment.backend_api + 'comments'; 
  private readonly leaveSalaryComment = environment.backend_api + 'comments/salary'; 
  private readonly leaveInterviewComment = environment.backend_api + 'comments/interview'; 

  visibleSalary: boolean = false;
  visibleComments: boolean = true;
  visibleInterviews: boolean = false;

  comments: any;
  salaryComments: any;
  interviewComments: any;
  positions: any;
  companyId: number = 1; // TODO SD: promeniti

  ngOnInit(): void {
    this.http.get<any>(`${this.getAllByCompanyId}` + this.companyId)
      .subscribe(data => {
        console.log(data)
        this.comments = data;
        this.http.get<any>(`${this.getAllSalaryCommentsByCompanyId}` + this.companyId)
          .subscribe(res => {
            console.log(res)
            this.salaryComments = res;
            this.http.get<any>(`${this.getAllInterviewCommentsByCompanyId}` + this.companyId)
              .subscribe(result => {
                console.log(result)
                this.interviewComments = result;
                this.http.get<any>(`${this.getAllPositionsByCompanyId}` + this.companyId + "/positions")
                  .subscribe(positions => {
                    console.log(positions);
                    this.positions = positions;
                  })
              })
          })
      })
  }
  changeVisibleComments() {
    this.visibleSalary = false;
    this.visibleComments = true;
    this.visibleInterviews = false;
  }

  changeVisibleSalary() {
    this.visibleSalary = true;
    this.visibleComments = false;
    this.visibleInterviews = false;
  }

  changeVisibleInterviews() {
    this.visibleSalary = false;
    this.visibleComments = false;
    this.visibleInterviews = true;
  }

  // ---------------------------------------------------------------------------------------------------------------------------------------------------- -->
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number = -1;
  star: number = -1;
  countStar(star) {
    this.selectedValue = star;
  }
  
  openDialog() {
    const dialogRef = this.dialog.open(DialogLeaveComment, {
      width: '500px',
      data: { comanyId: this.companyId, positions: this.positions },
    });

    dialogRef.afterClosed().subscribe(result => {
      let body = {
        "title": result.title,
        "content": result.content,
        "companyId": this.companyId,
        "rating": result.rating.toString(),
        "position": result.position,
      }
      const headers = new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
     });
      this.http.post<any>(`${this.leaveComment}`, JSON.stringify(body), {'headers': headers})
        .subscribe( data => {
          let comms = data;
          this.comments.push(comms);
        }, 
        err => {
          alert(err.message);
        });
    });
  }

  // ---------------------------------------------------------------------------------------------------------------------------------------------------- -->

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
        "companyId": this.companyId,
        "isFormerEmployee": result.isFormerEmployee,
        "bonus" : result.bonus,
        "fairPay" : result.fairPay,
      }
      const headers = new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
     });
      this.http.post<any>(`${this.leaveSalaryComment}`, JSON.stringify(body), {'headers': headers})
        .subscribe( data => {
          this.http.get<any>(`${this.getAllSalaryCommentsByCompanyId}` + this.companyId)
          .subscribe(res => {
            this.salaryComments = res;
          })
        }, 
        err => {
          alert(err.message);
        });
    })
  }

  // ---------------------------------------------------------------------------------------------------------------------------------------------------- -->
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
        "companyId": this.companyId,
        "rating": result.rating.toString(),
      }
      const headers = new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
     });
      this.http.post<any>(`${this.leaveInterviewComment}`, JSON.stringify(body), {'headers': headers})
        .subscribe( data => {
          this.http.get<any>(`${this.getAllInterviewCommentsByCompanyId}` + this.companyId)
          .subscribe(res => {
            this.interviewComments = res;
          })
        }, 
        err => {
          alert(err.message);
        });
    })
  }
}

