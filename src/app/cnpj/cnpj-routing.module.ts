import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CNPJListComponent } from '@app/cnpj/cnpj-list/cnpj-list.component';
import { Route, extract } from '@app/core';

const routes: Routes = [
  Route.withShell([
  { path: 'public/cnpjList', component: CNPJListComponent, data: { title: extract('registerCnpj.insert') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class CNPJRoutingModule { }
