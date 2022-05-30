import { Component, Inject } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface DialogData {
    positions: string[];
    position: string;
    pay: number;
    isFormerEmployee: boolean;
    bonus: boolean;
    fairPay: boolean;
  }
  
  @Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'dialog-enter-salary.html',
    styleUrls: ['../company-profile.component.scss']
  })
  export class DialogEnterSalary {
    constructor(
      public dialogRef: MatDialogRef<DialogEnterSalary>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {}

    payFormControl = new FormControl(undefined, [Validators.required, Validators.min(100)]);
    positionFormControl = new FormControl('', [Validators.required]);
    isFormerEmployeeFormControl = new FormControl(undefined, [Validators.required]);
    bonusFormControl = new FormControl(undefined, [Validators.required]);
    fairPayFormControl = new FormControl(undefined, [Validators.required]);

    onNoClick(): void {
      this.dialogRef.close();
    }
   checkIfFormIsInvalid(){
     if(this.payFormControl.hasError('required')
      || this.payFormControl.hasError('min')
      || this.positionFormControl.hasError('required')
      || this.isFormerEmployeeFormControl.hasError('required')
      || this.bonusFormControl.hasError('required')
      || this.fairPayFormControl.hasError('required')){
        return true;
      }
     return false;
   }
  
  }