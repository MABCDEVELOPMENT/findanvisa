import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route, extract } from '@app/core';
import { GenericParameterComponent } from '@app/generic-parameter/generic-parameter.component';

const routes: Routes = [
  Route.withShell([
    { path: 'public/generic', component: GenericParameterComponent, data: { title: extract('GenericParameter') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenericParameterRoutingModule { }
