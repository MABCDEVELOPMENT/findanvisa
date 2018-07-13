import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { GenericParameterRoutingModule } from './generic-parameter-routing.module';
import { GenericParameterComponent } from './generic-parameter.component';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { GenericParameterService } from '@app/generic-parameter/generic-parameter.service';
import { TextMaskModule } from 'angular2-text-mask';
@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    TextMaskModule,
    FormsModule,
    BrowserAnimationsModule,
    GenericParameterRoutingModule
  ],
  providers:[GenericParameterService],
  declarations: [GenericParameterComponent]
})
export class GenericParameterModule { }
