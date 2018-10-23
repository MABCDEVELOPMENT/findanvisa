import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { I18nService, AuthenticationService } from '@app/core';
import { LoginService } from '@app/login/login.service';
import { User } from '@app/user/user-model';
import { ErrorDialogComponent } from '@app/core/message/error-dialog.component';
import { MatDialog } from '@angular/material';
import { Login } from '../login.model';

@Component({
  selector: 'app-redefine-password',
  templateUrl: './redefine-password.component.html',
  styleUrls: ['./redefine-password.component.scss']
})
export class RedefinePasswordComponent implements OnInit {

  error: string;
  redefineForm: FormGroup;
  isLoading: boolean = false;
  user: User;
  token:string;
  id: any;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    public dataService: LoginService,
    private dialog: MatDialog,
    private i18nService: I18nService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {
   
    
    this.createForm();
    
  }
  GetParam(name:string) : any{
    const results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if(!results){
      return 0;
    }
    return results[1] || 0;
  }

  PrintParams() {
    console.log('id = ' + this.GetParam('?'));

  }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
    this.loadUser();
  }
  private createForm() {
    this.redefineForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.checkIfMatchingPasswords('password', 'confirmPassword') });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true })
      }
      else {
        return passwordConfirmationInput.setErrors(null);
      }
    }
  }

  loadUser() {
    this.authenticationService.loadUserToken(this.token)
      .then(
        data => {
          this.user = data;
        },
        error => {
          this.error = error.error.errorMessage;
          this.showMsg(this.error);
        });
  }
  redefinePassword() {
    let pass = this.redefineForm.controls['password'].value;
    this.user.password = pass;
    this.dataService.redefinePassword(this.user,this.token).then(
      data => {
        this.showMsg("Solicitação enviada com sucesso!");
      },
      error => {
        this.showMsg("Erro de comunicação!");
    });
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  

showMsg(msg : string) : void {
  this.dialog.open(ErrorDialogComponent, {
    data: {errorMsg: msg} ,width : '250px',height: '150px'
  });
}
}
