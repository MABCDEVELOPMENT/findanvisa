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
import { ForgotPasswordComponent } from './forgot-password-component/forgot-password-component'

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
  providers:[LoginService],
  declarations: [
    LoginComponent,
    ForgotPasswordComponent
  ],
  entryComponents:[ForgotPasswordComponent]
})
export class LoginModule { }
