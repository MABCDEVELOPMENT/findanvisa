import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService } from '@app/core';
import { MatDialog } from '@angular/material';
import { ForgotPasswordComponent } from '@app/login/forgot-password-component/forgot-password-component';
import { ErrorDialogComponent } from '@app/core/message/error-dialog.component';
import { booleanLiteral } from 'babel-types';

const log = new Logger('Login');

export interface Credentials {
  // Customize received credentials here
  id: number;
  username: string;
  email: string;
  isAdm: boolean;
  token: string;
  password: string;
  remember: boolean;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  version: string = environment.version;
  error: any;
  loginForm: FormGroup;
  isLoading = false;
  email: string;
  private credential: Credentials;
  constructor(private router: Router,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private authenticationService: AuthenticationService) {

  }

  ngOnInit() {
    this.createForm();
    let remember: any;
    if (this.authenticationService.credentials==undefined) {
      remember = false;
    } else {
      remember = this.authenticationService.credentials.remember;
    }
    if (remember === true) {
      this.loginForm.controls['email'].patchValue(this.authenticationService.credentials.email);
      this.loginForm.controls['password'].patchValue(this.authenticationService.credentials.password);
    } else {
      this.loginForm.controls['email'].patchValue('');
      this.loginForm.controls['password'].patchValue('');
      remember = false;
    }
    this.loginForm.controls['remember'].patchValue(remember);
  }

  login() {

    this.authenticationService.login(this.loginForm.value)
      .then(
        data => {
          this.email = data['email'];
          let user = data;
          if (data.error) {
            this.showMsg("Login invalido!");
            return;
          }
          this.credential = {
            id: user.id, username: user.userName, email: user.email,
            isAdm: (user.profile == 1), token: '123456', remember: this.loginForm.controls['remember'].value, password: this.loginForm.controls['password'].value
          };

          this.authenticationService.setCredentials(this.credential, this.credential.remember);
          this.router.navigate(['/'], { replaceUrl: true });
        }).catch(
          error => {
            this.error = error;
            this.showMsg(this.error);
            this.router.navigate(['/login'], { replaceUrl: true });
          });

  }

  forgotPassword() {
    if (this.loginForm.controls.email.invalid) {
      this.showMsg("Informe e-mail.");
      return;
    }
    this.authenticationService.getEmail(this.loginForm.controls.email.value)
      .then(
        data => {
          this.email = data['email'];
          this.isLoading = true;
          this.sendEmail(this.email);
          this.isLoading = false;
        }).catch(
          error => {
            this.error = JSON.stringify(error);
            this.showMsg('Usuário Inválido!');
            return;
          });
  }

  sendEmail(email: string) {

    if (this.email) {
      const dialogRef = this.dialog.open(ForgotPasswordComponent, {
        data: { email: this.email },
        height: '200px',
        width: '400px'
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {

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

  showMsg(message: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { errorMsg: message }, width: '250px', height: '200px'
    });
  }

}
