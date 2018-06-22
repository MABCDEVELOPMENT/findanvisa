import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LoginService }  from './login.service';
import { ForgotPasswordComponent } from './forgot-password-component/forgot-password-component';
import { RedefinePasswordComponent } from './redefine-password/redefine-password.component'
import { RegisterComponent } from '@app/login/register-user/register.component';
import { RegisterService } from '@app/login/register-user/register.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    LoginRoutingModule
  ],
  providers:[LoginService,RegisterService],
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    RedefinePasswordComponent,
    RegisterComponent
  ],
  entryComponents:[ForgotPasswordComponent]
})
export class LoginModule { }
