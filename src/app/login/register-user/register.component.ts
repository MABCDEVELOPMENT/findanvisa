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
  user: User = new User();
  isLoading: boolean = false;
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
    this.user.userName = fullName.substr(0, index)
    this.user.email = email;
    this.user.fullName = fullName;
    this.user.profile = 2;
    this.registerService.register(this.user);
    this.router.navigate(['/'], { replaceUrl: true });

  }

}
