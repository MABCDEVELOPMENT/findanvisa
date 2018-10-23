import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { LoginComponent } from './login.component';
import { RedefinePasswordComponent } from '@app/login/redefine-password/redefine-password.component';
import { RegisterComponent } from '@app/login/register-user/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: extract('Login') }},
  { path: 'redefine/:token', component: RedefinePasswordComponent, data: { title: extract('Redefine') }},
  { path: 'registerUser', component: RegisterComponent, data: { title: extract('registerUser') } 
}
];

@NgModule({
  //imports: [RouterModule.forRoot(routes, {useHash: true})],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class LoginRoutingModule { }
