import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import {Component, Inject} from '@angular/core';
import {UserService} from '../../user/user.service';
import {FormControl, Validators} from '@angular/forms';

import { User } from '@app/user/user-model';

@Component({
  selector: 'app-edit.dialog',
  templateUrl: './user-edit.component.html'
})

export class UserEditDialogComponent {
  
  confirmPassword:string;

  constructor(public dialogRef: MatDialogRef<UserEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: User,
              public dataService: UserService) { }

  formControl = new FormControl('', [
    Validators.required
    //Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      //this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
  // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {

    this.dataService.updateUser(this.data);
    
  }
}