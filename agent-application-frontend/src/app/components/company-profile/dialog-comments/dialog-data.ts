import { Component, Inject } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface DialogData {
    title: string;
    content: string;
    position: string;
    positions: string[];
    rating: number;
  }
  
  @Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'dialog-leave-comment.html',
    styleUrls: ['../company-profile.component.scss']
  })
  export class DialogLeaveComment {
    constructor(
      public dialogRef: MatDialogRef<DialogLeaveComment>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {}
    stars: number[] = [1, 2, 3, 4, 5];
    selectedValue: number = 0;
    star: number = -1;
    formIsInvalid: boolean = true;
    errorMessage: string = '';

    titleFormControl = new FormControl('', [Validators.required]);
    positionFormControl = new FormControl('', [Validators.required]);
    contentFormControl = new FormControl('', [Validators.required]);
    starsFormControl = new FormControl('', [Validators.min(1)]);
    starsError: boolean = false;
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    
    countStar(star) {
      this.selectedValue = star;
      this.data.rating = star
      console.log('Value of star', star);
      this.starsError = false;
    }

    checkIfFormIsInvalid(){
      if(this.selectedValue == 0) {
        this.starsError = true;
      }
      if(this.titleFormControl.hasError('required') || this.contentFormControl.hasError('required') || this.positionFormControl.hasError('required') || this.starsError) {
        return true;
      } else {
        return false;
      }
    }

  }