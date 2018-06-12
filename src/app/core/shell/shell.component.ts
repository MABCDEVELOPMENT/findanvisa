import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ObservableMedia } from '@angular/flex-layout';

import { AuthenticationService } from '../authentication/authentication.service';
import { I18nService } from '../i18n.service';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import localeEn from '@angular/common/locales/en';
import { User } from '@app/user/user-model';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from '@app/core/shell/login/login.component';
import { Login } from '@app/core/shell/login/login.model';




@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  constructor(private router: Router,
              private titleService: Title,
              public dialog: MatDialog,
              private media: ObservableMedia,
              private authenticationService: AuthenticationService,
              private i18nService: I18nService) { }

  ngOnInit() { }

  setLanguage(language: string) {
    if (language=='pt-BR') {
      registerLocaleData(localePt);
    } else if (language=='en-US') {
      registerLocaleData(localeEn);
    }
    this.i18nService.language = language;
  }

  logout() {
    this.authenticationService.logout()
      .subscribe(() => this.router.navigate(['/home'], { replaceUrl: true }));
  }
  
  /*login() {
    this.authenticationService.logout()
      .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }*/

  login(login:Login) {
    const dialogRef = this.dialog.open(LoginDialogComponent, {data: {login: Login},
      height: 'auto',
      width: '250px'
      
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        // this.dataSource.dataChange.value.push(this.dataService.getDialogData());
        //this.refreshTable();
      }
    });
  }

  get username(): string | null {
    const credentials = this.authenticationService.credentials;
    return credentials ? credentials.username : null;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }

  get title(): string {
    return this.titleService.getTitle();
  }
}
