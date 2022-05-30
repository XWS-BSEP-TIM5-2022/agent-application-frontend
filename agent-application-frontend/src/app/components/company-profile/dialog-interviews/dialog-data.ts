import { Component, Inject } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface DialogData {
  position: string;
  title: string;
  hrInterview: number;
  technicalInterview: string;
  rating: number;
  positions: string[];
}
  
  @Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'dialog-enter-interview.html',
    styleUrls: ['../company-profile.component.scss']
  })
  export class DialogEnterInterview {
    constructor(
      public dialogRef: MatDialogRef<DialogEnterInterview>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {}
  
    positionFormControl = new FormControl('', [Validators.required]);
    titleFormControl = new FormControl('', [Validators.required]);
    hrInterviewFormControl = new FormControl('', [Validators.required]);
    techInterviewFormControl = new FormControl('', [Validators.required]);
    starsError: boolean = false;


    onNoClick(): void {
      this.dialogRef.close();
    }

    stars: number[] = [1, 2, 3, 4, 5];
    selectedValue: number = 0;
    star: number = -1;
    countStar(star) {
      this.selectedValue = star;
      this.data.rating = star;
      console.log('Value of star', star);
      this.starsError = false;
    }

    checkIfFormIsInvalid(){
      if(this.selectedValue == 0) {
        this.starsError = true;
      }
      if(this.titleFormControl.hasError('required')
       || this.positionFormControl.hasError('required')
       || this.hrInterviewFormControl.hasError('required')
       || this.techInterviewFormControl.hasError('required')
       || this.starsError){
         return true;
       }
      return false;
    }
  }