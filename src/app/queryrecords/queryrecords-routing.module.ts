import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route, extract } from '@app/core';
import { QueryrecordListComponent } from './queryrecord-list/queryrecord-list.component'
import { QueryrecordprocessListComponent } from '@app/queryrecords/queryrecordprocess-list/queryrecordprocess-list.component';

const routes: Routes = [
  Route.withShell([
  { path: 'queryRecord', component: QueryrecordListComponent, data: { title: extract('queryRecords') } },
  { path: 'queryRecordProcess', component: QueryrecordprocessListComponent, data: { title: extract('queryProcessRecords') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueryrecordsRoutingModule { }
