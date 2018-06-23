import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ObservableMedia } from '@angular/flex-layout';

import { AuthenticationService } from '../authentication/authentication.service';
import { I18nService } from '../i18n.service';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import localeEn from '@angular/common/locales/en';
import { GenericParameter } from '@app/generic-parameter/generic-parameter.model';
import { GenericParameterService } from '@app/generic-parameter/generic-parameter.service';



@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  genericParameter : GenericParameter = new GenericParameter();
  constructor(private router: Router,
              private titleService: Title,
              private media: ObservableMedia,
              private genericParameterService: GenericParameterService,
              private authenticationService: AuthenticationService,
              private i18nService: I18nService) { }

  ngOnInit() { 
    this.genericParameterService.load().subscribe(data => {
      this.genericParameter = data;
      this.titleService.setTitle(this.genericParameter.systemName);
    })
  }

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
      .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
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
