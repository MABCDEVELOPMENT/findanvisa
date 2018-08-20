import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route, extract } from '@app/core';
import { QueryrecordListComponent } from './queryrecord-list/queryrecord-list.component'
import { QueryrecordprocessListComponent } from '@app/queryrecords/queryrecordprocess-list/queryrecordprocess-list.component';
import { FilterFootComponent } from '@app/queryrecords/queryrecord-list/table/foot/filter-foot';
import { FilteCosmeticRegisterComponent } from '@app/queryrecords/queryrecord-list/table/cometic/register/filter-cosmetic-register';
import { TableFootComponent } from '@app/queryrecords/queryrecord-list/table/foot/table-foot';
import { TableCosmeticRegisterComponent } from '@app/queryrecords/queryrecord-list/table/cometic/register/table-cosmetic-register';
import { FilteCosmeticNotificationComponent } from '@app/queryrecords/queryrecord-list/table/cometic/notification/filter-cosmetic-notification';
import { FilterCosmeticRegularizedComponent } from '@app/queryrecords/queryrecord-list/table/cometic/regularized/filter-cosmetic-regularized';
import { TableCosmeticNotificationComponent } from '@app/queryrecords/queryrecord-list/table/cometic/notification/table-cosmetic-notification';
import { TableCosmeticRegularizedComponent } from '@app/queryrecords/queryrecord-list/table/cometic/regularized/table-cosmetic-regularized';
import { FilterSaneanteProductComponent } from '@app/queryrecords/queryrecord-list/table/saneante/product/filter-saneante-product';
import { TableSaneanteProductComponent } from '@app/queryrecords/queryrecord-list/table/saneante/product/table-saneante-product';
import { FilteSaneanteNotificationComponent } from '@app/queryrecords/queryrecord-list/table/saneante/notification/filter-saneante-notification';
import { TableSaneanteNotificationComponent } from '@app/queryrecords/queryrecord-list/table/saneante/notification/table-saneante-notification';
import { FilteProcessComponent } from '@app/queryrecords/queryrecordprocess-list/process/filter-process';
import { TableProcessComponent } from '@app/queryrecords/queryrecordprocess-list/process/table-process';
import { DetailFootComponent } from '@app/queryrecords/queryrecord-list/table/foot/detail/detail-foot';
import { DetailCosmeticRegisterComponent } from '@app/queryrecords/queryrecord-list/table/cometic/register/detail/detail-cosmetic-register';
import { DetailCosmeticNotificationComponent } from '@app/queryrecords/queryrecord-list/table/cometic/notification/detail/detail-cosmetic-notification';
import { DetailCosmeticRegularizedComponent } from '@app/queryrecords/queryrecord-list/table/cometic/regularized/detail/detail-cosmetic-regularized';
import { DetailSaneanteProductComponent } from '@app/queryrecords/queryrecord-list/table/saneante/product/detail/detail-seneante-product';
import { DetailSaneanteNotificationComponent } from '@app/queryrecords/queryrecord-list/table/saneante/notification/detail/detail-saneante-notification';

const routes: Routes = [
  Route.withShell([
    {
      path: 'queryRecord', component: QueryrecordListComponent, data: { title: extract('queryRecords') },
      children: [
        { path: 'filter-foot', component: FilterFootComponent },
        { path: 'table-foot', component: TableFootComponent },
        { path: 'detail-foot', component: DetailFootComponent },

        { path: 'filter-cosmetic-register', component: FilteCosmeticRegisterComponent },
        { path: 'table-cosmetic-register', component: TableCosmeticRegisterComponent },
        { path: 'detail-cosmetic-register', component: DetailCosmeticRegisterComponent },

        { path: 'filter-cosmetic-notification', component: FilteCosmeticNotificationComponent },
        { path: 'table-cosmetic-notification', component: TableCosmeticNotificationComponent },
        { path: 'detail-cosmetic-notification', component: DetailCosmeticNotificationComponent },

        { path: 'filter-cosmetic-regularized', component: FilterCosmeticRegularizedComponent },
        { path: 'table-cosmetic-regularized', component: TableCosmeticRegularizedComponent },
        { path: 'detail-cosmetic-regularized', component: DetailCosmeticRegularizedComponent },

        { path: 'filter-saneante-product', component: FilterSaneanteProductComponent },
        { path: 'table-saneante-product', component: TableSaneanteProductComponent },
        { path: 'detail-saneante-product', component: DetailSaneanteProductComponent },

        { path: 'filter-saneante-notification', component: FilteSaneanteNotificationComponent },
        { path: 'table-saneante-notification', component: TableSaneanteNotificationComponent },
        { path: 'detail-saneante-notification', component: DetailSaneanteNotificationComponent },
      ]
    },
    {
      path: 'queryRecordProcess', component: QueryrecordprocessListComponent, data: { title: extract('queryProcessRecords') },
      children: [
        { path: 'filter-process', component: FilteProcessComponent },
        { path: 'table-process', component: TableProcessComponent },
        { path: 'detail-process', component: TableProcessComponent }
      ]
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueryrecordsRoutingModule { }
