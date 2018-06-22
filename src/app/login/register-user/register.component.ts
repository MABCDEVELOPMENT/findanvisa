import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService } from '@app/core';
import { RegisterService } from './register.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '@app/user/user-model';

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
  user : User = new User();
  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private i18nService: I18nService,
              private registerService: RegisterService) {
    this.createForm();
  }

  ngOnInit() { }

  private createForm() {
    this.registerForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      username: ['', Validators.required]
    });
  }

  register() {
    let fullName = this.registerForm.controls["fullname"].value;
    let username = this.registerForm.controls["username"].value;
     this.user.userName = username;
     this.user.fullName = fullName;
     this.user.perfil = 1;
     this.registerService.register(this.user);
     this.router.navigate(['/'], { replaceUrl: true });

  }

}
