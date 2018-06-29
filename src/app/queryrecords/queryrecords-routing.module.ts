import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route, extract } from '@app/core';
import { QueryrecordListComponent } from './queryrecord-list/queryrecord-list.component'

const routes: Routes = [
  Route.withShell([
  { path: 'queryRecord', component: QueryrecordListComponent, data: { title: extract('queryRecords') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueryrecordsRoutingModule { }
