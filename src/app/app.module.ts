import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';


import { environment } from '@env/environment';
import { CoreModule, I18nService } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeModule } from './home/home.module';
import { AboutModule } from './about/about.module';
import { LoginModule } from './login/login.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UserModule } from '@app/user/user.module';
import { MAT_DATE_LOCALE } from '@angular/material';
import { GenericParameterModule } from '@app/generic-parameter/generic-parameter.module';
import { UpdateParameterModule } from '@app/update-parameter/update-parameter.module';
import { CNPJModule } from '@app/cnpj/cnpj.module';
import { QueryrecordsModule } from '@app/queryrecords/queryrecords.module'; 
import { ErrorDialogComponent } from '@app/core/message/error-dialog.component';
import { SidenavService } from '@app/core/sidenav.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';


@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    Ng4LoadingSpinnerModule.forRoot(),
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    HomeModule,
    AboutModule,
    LoginModule,
    DashboardModule,
    UserModule,
    GenericParameterModule,
    UpdateParameterModule,
    CNPJModule,
    QueryrecordsModule,
    AppRoutingModule
  ],
  declarations: [AppComponent,ErrorDialogComponent],
  entryComponents: [ErrorDialogComponent],
  providers: [  {provide: MAT_DATE_LOCALE, useValue: getLanguage},SidenavService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getLanguage(settingsService: I18nService) {
  return settingsService.language;
}
