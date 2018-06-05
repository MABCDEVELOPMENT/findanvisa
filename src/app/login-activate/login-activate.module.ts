import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginActivateRoutingModule } from './login-activate-routing.module';
import { LoginActivateComponent } from './login-activate.component';

@NgModule({
  imports: [
    CommonModule,
    LoginActivateRoutingModule
  ],
  declarations: [LoginActivateComponent]
})
export class LoginActivateModule { }
