import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService } from '@app/core';
import { UserService } from '../user.service';
import { User } from '@app/user/user-model';
import { MatDialog } from '@angular/material';


const log = new Logger('UserCNPJ');

@Component({
  selector: 'app-user-cnpj',
  templateUrl: './user-cnpj.component.html',
  styleUrls: ['./user-cnpj.component.scss']
})
export class UserCNPJComponent implements OnInit {

  version: string = environment.version;
  error: string;
  registerForm: FormGroup;
  user : User = new User();

  isLoading: boolean = true;
  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private i18nService: I18nService,
              private dialog: MatDialog,
              private userService: UserService) {
    this.createForm();
  }

  ngOnInit() { }

  private createForm() {
    
  }

  register() {
    let fullName = this.registerForm.controls["fullname"].value;
    let username = this.registerForm.controls["username"].value;
     this.user.userName = username;
     this.user.fullName = fullName;
     this.user.profile = 2;
     this.userService.save(this.user);
     this.router.navigate(['/'], { replaceUrl: true });

  }

}
