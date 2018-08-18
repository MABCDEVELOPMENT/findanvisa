import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared';
import { TextMaskModule } from 'angular2-text-mask';

import { Queryrecords } from './queryrecords.model';
import { QueryrecordsService } from './queryrecords.service';
import { QueryrecordsRoutingModule } from './queryrecords-routing.module';
import { QueryrecordListComponent } from './queryrecord-list/queryrecord-list.component';
import { QueryrecordprocessListComponent } from '@app/queryrecords/queryrecordprocess-list/queryrecordprocess-list.component';
import { TableComponent } from '@app/queryrecords/queryrecord-list/table/table-component';

//Categoria Alimentos
import {FilterService} from '@app/queryrecords/queryrecord-list/table/filter-service';
import { FilterFootComponent } from '@app/queryrecords/queryrecord-list/table/foot/filter-foot';
import { TableFootComponent } from '@app/queryrecords/queryrecord-list/table/foot/table-foot';

//Categoria Cosmeticos->Produtos Registrados
import { FilteCosmeticRegisterComponent } from '@app/queryrecords/queryrecord-list/table/cometic/register/filter-cosmetic-register';
import { TableCosmeticRegisterComponent } from '@app/queryrecords/queryrecord-list/table/cometic/register/table-cosmetic-register';
import { FilteCosmeticNotificationComponent } from '@app/queryrecords/queryrecord-list/table/cometic/notification/filter-cosmetic-notification';
import { TableCosmeticNotificationComponent } from '@app/queryrecords/queryrecord-list/table/cometic/notification/table-cosmetic-notification';
import { FilterCosmeticRegularizedComponent } from '@app/queryrecords/queryrecord-list/table/cometic/regularized/filter-cosmetic-regularized';
import { TableCosmeticRegularizedComponent } from '@app/queryrecords/queryrecord-list/table/cometic/regularized/table-cosmetic-regularized';
import { FilterSaneanteProductComponent } from '@app/queryrecords/queryrecord-list/table/saneante/product/filter-saneante-product';
import { TableSaneanteProductComponent } from '@app/queryrecords/queryrecord-list/table/saneante/product/table-saneante-product';
import { FilteSaneanteNotificationComponent } from '@app/queryrecords/queryrecord-list/table/saneante/notification/filter-saneante-notification';
import { TableSaneanteNotificationComponent } from '@app/queryrecords/queryrecord-list/table/saneante/notification/table-saneante-notification';
import { FilteProcessComponent } from '@app/queryrecords/queryrecordprocess-list/process/filter-process';
import { TableProcessComponent } from '@app/queryrecords/queryrecordprocess-list/process/table-process';
import { DetailFootComponent } from '@app/queryrecords/queryrecord-list/table/foot/detail/detail-foot';
import { DetailCosmeticRegisterComponent } from '@app/queryrecords/queryrecord-list/table/cometic/register/detail/datail-cosmetic-register';



@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule, ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule,
    TextMaskModule,
    QueryrecordsRoutingModule
  ],
  exports: [QueryrecordListComponent, 
    QueryrecordprocessListComponent,
    TableComponent, 
    FilterFootComponent,
    TableFootComponent,
    DetailFootComponent,
    FilteCosmeticRegisterComponent, 
    TableCosmeticRegisterComponent,
    DetailCosmeticRegisterComponent,
    FilteCosmeticNotificationComponent,
    TableCosmeticNotificationComponent,
    FilterCosmeticRegularizedComponent,
    TableCosmeticRegularizedComponent,
    FilterSaneanteProductComponent,
    TableSaneanteProductComponent,
    FilteSaneanteNotificationComponent,
    TableSaneanteNotificationComponent,
    FilteProcessComponent,
    TableProcessComponent],
  declarations: [QueryrecordListComponent, 
    QueryrecordprocessListComponent,
    TableComponent, 
    FilterFootComponent,
    TableFootComponent,
    DetailFootComponent,
    FilteCosmeticRegisterComponent,
    TableCosmeticRegisterComponent,
    DetailCosmeticRegisterComponent,
    FilteCosmeticNotificationComponent,
    TableCosmeticNotificationComponent,
    FilterCosmeticRegularizedComponent,
    TableCosmeticRegularizedComponent,
    FilterSaneanteProductComponent,
    TableSaneanteProductComponent,
    FilteSaneanteNotificationComponent,
    TableSaneanteNotificationComponent,
    FilteProcessComponent,
    TableProcessComponent],
  providers: [QueryrecordsService, Queryrecords,FilterService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QueryrecordsModule { }
