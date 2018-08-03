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
    FilteCosmeticRegisterComponent, 
    TableCosmeticRegisterComponent],
  declarations: [QueryrecordListComponent, 
    QueryrecordprocessListComponent,
    TableComponent, 
    FilterFootComponent,
    TableFootComponent,
    FilteCosmeticRegisterComponent,
    TableCosmeticRegisterComponent],
  providers: [QueryrecordsService, Queryrecords,FilterService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QueryrecordsModule { }
