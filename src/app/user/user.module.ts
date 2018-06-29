import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { MaterialModule } from '@app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

import { UserAddDialogComponent } from './user-add/user-add.component';
import { UserEditDialogComponent } from './user-edit/user-edit.component';
import { UserService } from '@app/user/user.service';
import { SharedModule } from '../shared';
import { TextMaskModule } from 'angular2-text-mask';
import { UserProfileComponent } from '@app/user/user-profile/user-profile.component';
import { User } from '@app/user/user-model';
import { UserCNPJComponent } from '@app/user/user-cnpj/user-cnpj.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule, ReactiveFormsModule,
    BrowserAnimationsModule,
    UserRoutingModule,
    SharedModule,
    TextMaskModule
  ],
  exports:[UserListComponent],
  entryComponents: [
    UserAddDialogComponent,UserEditDialogComponent,UserCNPJComponent],
  declarations: [UserListComponent, UserAddDialogComponent,UserEditDialogComponent, UserCNPJComponent,UserProfileComponent],
  providers:[UserService,User],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserModule { }
