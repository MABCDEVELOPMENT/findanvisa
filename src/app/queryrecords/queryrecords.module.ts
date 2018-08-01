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
import { FilteCosmeticRegisterComponent } from '@app/queryrecords/queryrecord-list/table/cometic/register/filter-cosmetic-register';
import { FilterFootComponent } from '@app/queryrecords/queryrecord-list/table/foot/filter-foot';
import { TableFootComponent } from '@app/queryrecords/queryrecord-list/table/foot/table-foot';


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
    FilteCosmeticRegisterComponent, 
    FilterFootComponent,
    TableFootComponent],
  declarations: [QueryrecordListComponent, 
    QueryrecordprocessListComponent,
    TableComponent, 
    FilteCosmeticRegisterComponent, 
    FilterFootComponent,
    TableFootComponent],
  providers: [QueryrecordsService, Queryrecords],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QueryrecordsModule { }
