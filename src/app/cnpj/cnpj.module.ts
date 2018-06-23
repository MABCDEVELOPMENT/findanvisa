import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { CNPJRoutingModule } from './cnpj-routing.module';
import { CNPJListComponent } from './cnpj-list/cnpj-list.component';
import { MaterialModule } from '@app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

import { CNPJAddDialogComponent } from './cnpj-add/cnpj-add.component';
import { CNPJEditDialogComponent } from './cnpj-edit/cnpj-edit.component';
import { CNPJService } from '@app/cnpj/cnpj.service';
import { SharedModule } from '../shared';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule, ReactiveFormsModule,
    BrowserAnimationsModule,
    CNPJRoutingModule,
    SharedModule,
    TextMaskModule
  ],
  exports:[CNPJListComponent],
  entryComponents: [
    CNPJAddDialogComponent,CNPJEditDialogComponent],
  declarations: [CNPJListComponent, CNPJAddDialogComponent,CNPJEditDialogComponent],
  providers:[CNPJService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CNPJModule { }
