import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService } from '@app/core';
import { RegisterService } from './register.service';
import { User } from '@app/user/user-model';
import { ErrorDialogComponent } from '@app/core/message/error-dialog.component';
import { MatDialog } from '@angular/material';
import { GenericParameterService } from '@app/generic-parameter/generic-parameter.service';
import { GenericParameter } from '@app/generic-parameter/generic-parameter.model';

const log = new Logger('Register');

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  version: string = environment.version;
  error: string;
  registerForm: FormGroup;
  user: User = new User();
  isLoading: boolean = false;
  parameter: GenericParameter;
  constructor(private router: Router,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    public genericParameterService: GenericParameterService) {
    this.createForm();
    this.genericParameterService.load().then(data => {
      this.parameter = data;
    }, err => {
      this.parameter = new GenericParameter();
    });
  }

  ngOnInit() { }

  private createForm() {
    this.registerForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  register() {
    let fullName = this.registerForm.controls["fullname"].value;
    let email = this.registerForm.controls["email"].value;
    let index = fullName.indexOf(" ");
    if (index == -1) {
      index = fullName.length - 1;
    }

    if (this.parameter.emailPermission) {
      let indexEmail = email.indexOf("@");
      let emailPermision = email.substr(indexEmail, email.length - 1);
      if (emailPermision != this.parameter.emailPermission) {
        this.showMsg('E-mail inválido!');
        return;
      }
    }

    this.user.userName = fullName.substr(0, index)
    this.user.email = email;
    this.user.fullName = fullName;
    this.user.profile = 2;
    this.registerService.register(this.user).then(data => {
      this.showMsg("Registro realizado com sucesso! Você receberar um email para ativação do usuário!");
      this.router.navigate(['/login'], { replaceUrl: true });
    }).catch( error => {
      this.error = error.error.errorMessage;
      this.showMsg(this.error);
      this.router.navigate(['/login'], { replaceUrl: true });
    });

  }

  showMsg(message: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { errorMsg: message }, width: '250px', height: '250px'
    });
  }

  goBack(){
    this.router.navigate(['/login'], { replaceUrl: true });
  }

}
