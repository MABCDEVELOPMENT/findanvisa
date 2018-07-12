import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

import { Route, extract, I18nService } from '@app/core';
import { HomeComponent } from './home.component';
import { GenericParameter } from '@app/generic-parameter/generic-parameter.model';
import { GenericParameterService } from '@app/generic-parameter/generic-parameter.service';
import { Title } from '@angular/platform-browser';

const routes: Routes = [
  Route.withShell([
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, data: { title: extract('Home') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class HomeRoutingModule { 
  
  genericParameter : GenericParameter = new GenericParameter();

  constructor(private router: Router,
    public genericParameterService : GenericParameterService,
    private titleService: Title,
    public i18n: I18nService) { }
   
getTitle() : string {
  this.genericParameterService.load().then(data => {
    this.genericParameter = data;
    this.titleService.setTitle(this.genericParameter.systemName);
    return this.titleService.getTitle()
  })
  return null;
}
  

}
