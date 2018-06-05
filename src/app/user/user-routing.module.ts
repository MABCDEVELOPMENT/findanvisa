import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from '@app/user/user-list/user-list.component';
import { Route, extract } from '@app/core';

const routes: Routes = [
  Route.withShell([
    { path: 'userList', component: UserListComponent, data: { title: extract('User') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class UserRoutingModule { }
