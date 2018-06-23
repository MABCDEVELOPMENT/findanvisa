import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route, extract } from '@app/core';
import { UpdateParameterComponent } from '@app/update-parameter/update-parameter.component';

const routes: Routes = [
  Route.withShell([
    { path: 'update', component: UpdateParameterComponent, data: { title: extract('UpdateParameters') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateParameterRoutingModule { }
