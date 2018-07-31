import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { GenericParameterService } from '@app/generic-parameter/generic-parameter.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  version: string = environment.version;
  title: string;
  constructor() { 
   
  }

  ngOnInit() { 

  }

}
