import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { QuoteService } from './quote.service';
import { GenericParameterService } from '@app/generic-parameter/generic-parameter.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  quote: string;
  isLoading: boolean;
  title: string;

  constructor(private quoteService: QuoteService,
    public genericParameterService:GenericParameterService,
    private titleService: Title) { 
  }

  ngOnInit() {
    this.isLoading = true;

   /*  this.quoteService.getRandomQuote({ category: 'dev' })
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((quote: string) => { this.quote = quote; }); */
  }

}
