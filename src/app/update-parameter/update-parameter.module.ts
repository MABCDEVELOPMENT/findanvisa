import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { UpdateParameterRoutingModule } from './update-parameter-routing.module';
import { UpdateParameterComponent } from './update-parameter.component';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateParameter } from '@app/update-parameter/update-parameter.model';
import { UpdateParameterService } from '@app/update-parameter/update-parameter.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    UpdateParameterRoutingModule
  ],
  providers:[UpdateParameterService],
  declarations: [UpdateParameterComponent]
})
export class UpdateParameterModule { }
