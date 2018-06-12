import {Component, Inject, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import { Logger, AuthenticationService } from '@app/core';
import { environment } from '@env/environment';
import { EmailValidator,CustomValidator } from '@app/shared/validators';
import { DateValidator } from '@app/shared/validators/date.validator';
import { PhoneValidator } from '@app/shared/validators/phone.validator';
import { finalize } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Login } from '@app/core/shell/login/login.model';
import { extract } from '@app/core';




@Component({
  selector: 'app-login-dialog',
  templateUrl: './login.component.html'
})
export class LoginDialogComponent implements OnInit {
  hide:any;
  hideConf:any;

  version: string = environment.version;
  error: string;
  form: FormGroup;
  isLoading = false;
  login: Login;
  remember:string;
  

  
  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Login) {
                  
  }
  
  ngOnInit() {
      this.form  = new FormGroup({
        userName:  new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
    });
  }

  getErrorMessage() {
    return this.form.controls.userName.hasError('required') ? 'fieldEmpty' :
           this.form.controls.password.hasError('required') ? 'fieldEmpty' :
            '';
  }

  submit() {
  // emppty stuff
  }

  onNoClick(): void {
    // emppty stuff
    this.dialogRef.close();
  }

  
}