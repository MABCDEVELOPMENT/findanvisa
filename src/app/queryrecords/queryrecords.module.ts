import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from '@app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared';
import { TextMaskModule } from 'angular2-text-mask';

import { Queryrecords } from './queryrecords.model';
import { QueryrecordsService } from './queryrecords.service';
import { QueryrecordsRoutingModule } from './queryrecords-routing.module';
import { QueryrecordListComponent } from './queryrecord-list/queryrecord-list.component';

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
  exports:[QueryrecordListComponent],
  declarations: [QueryrecordListComponent],
  providers:[QueryrecordsService,Queryrecords],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QueryrecordsModule { }
