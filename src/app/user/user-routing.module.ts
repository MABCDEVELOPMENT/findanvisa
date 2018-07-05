import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from '@app/user/user-list/user-list.component';
import { Route, extract } from '@app/core';
import { UserProfileComponent } from '@app/user/user-profile/user-profile.component';

const routes: Routes = [
  Route.withShell([
    { path: 'public/userList', component: UserListComponent, data: { title: extract('User') }},
    { path: 'public/userProfile', component: UserProfileComponent, data: { title: extract('userProfile') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class UserRoutingModule { }
