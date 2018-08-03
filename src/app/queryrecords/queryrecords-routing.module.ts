import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route, extract } from '@app/core';
import { QueryrecordListComponent } from './queryrecord-list/queryrecord-list.component'
import { QueryrecordprocessListComponent } from '@app/queryrecords/queryrecordprocess-list/queryrecordprocess-list.component';
import { FilterFootComponent } from '@app/queryrecords/queryrecord-list/table/foot/filter-foot';
import { FilteCosmeticRegisterComponent } from '@app/queryrecords/queryrecord-list/table/cometic/register/filter-cosmetic-register';
import { TableFootComponent } from '@app/queryrecords/queryrecord-list/table/foot/table-foot';
import { TableCosmeticRegisterComponent } from '@app/queryrecords/queryrecord-list/table/cometic/register/table-cosmetic-register';

const routes: Routes = [
  Route.withShell([
  { path: 'queryRecord', component: QueryrecordListComponent, data: { title: extract('queryRecords') },
    children: [
      { path: 'filter-foot', component: FilterFootComponent },
      
      { path: 'filter-cosmetic-register', component: FilteCosmeticRegisterComponent },
      { path: 'table-foot', component: TableFootComponent},
      { path: 'table-cosmetic-register', component: TableCosmeticRegisterComponent }
    ] 
  },
  { path: 'queryRecordProcess', component: QueryrecordprocessListComponent, data: { title: extract('queryProcessRecords') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueryrecordsRoutingModule { }
