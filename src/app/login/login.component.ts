import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService } from '@app/core';
import { MatDialog } from '@angular/material';
import { ForgotPasswordComponent } from '@app/login/forgot-password-component/forgot-password-component';
import { LoginService } from '@app/login/login.service';
import { HttpErrorResponse } from '@angular/common/http';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  version: string = environment.version;
  error: string;
  loginForm: FormGroup;
  isLoading = false;
  email: string;
  constructor(private router: Router,
              private dialog: MatDialog,
              private formBuilder: FormBuilder,
              private i18nService: I18nService,
              private loginService: LoginService,
              private authenticationService: AuthenticationService) {
    this.createForm();
  }

  ngOnInit() { }

  login() {

    this.authenticationService.login(this.loginForm.value)
    .then(data=>{
      log.debug(`${data.username} successfully logged in`);
      this.router.navigate(['/'], { replaceUrl: true });
    }).catch(err=>{
      this.error = err.error;
      alert(this.error);
      this.isLoading = false;
    })
    /*this.isLoading = true;
    let userName = this.loginForm.controls["username"];
    let password = this.loginForm.controls["password"];
    this.loginService.login(userName.value,password.value).subscribe(){data => 
      this.authenticationService.credentials()
    }*/

    // this.authenticationService.login(this.loginForm.value)
    //    .pipe(finalize(() => {
    //      this.loginForm.markAsPristine();
    //      this.isLoading = false;
    //    }))
    //    .subscribe(credentials => {
    //      log.debug(`${credentials.username} successfully logged in`);
    //      this.router.navigate(['/'], { replaceUrl: true });
    //    },err  => {
    //      log.debug(`Login error: ${err}`);
    //      this.error = err.error;
    //      alert(this.error);
    //    });

    // this.authenticationService.login(this.loginForm.value)
    // .subscribe(
    //   credentials => {
    //       this.router.navigate(['/'], { replaceUrl: true });
    //     },
    //     err  => {
    //         //this.error = err.error;
    //         alert(this.error);
    //         this.isLoading = false;
    //     });

  }

  forgotPassword() {
    this.authenticationService.getEmail(this.loginForm.value)
    .subscribe(
      data => {
        this.email = data['email'];
      },
      error => {
        this.error = error;
        alert(error); 
      });
  }

  sendEmail() {
    this.forgotPassword();
    if (this.email) {
      const dialogRef = this.dialog.open(ForgotPasswordComponent, {data: {email: this.email},
        height: '200px',
        width: '400px'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
          // After dialog is closed we're doing frontend updates
          // For add we're just pushing a new row inside DataService
          // this.dataSource.dataChange.value.push(this.dataService.getDialogData());
          //this.refreshTable();

        }
      });

    }
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });
  }

}
