import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashBoardComponent implements OnInit {
  calendarOptions: Options;
  
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  
  constructor() {}
  ngOnInit() {
    const dateObj = new Date();
    const yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
     this.calendarOptions = {
        editable: true,
        eventLimit: false,
        height: 'auto',
        locale:'pt-BR',
        buttonText: {
          prev:     'Anterior',
          next:     'Proximo',
          prevYear: 'Ano Anterior',
          nextYear: 'Proximo Ano',
          today:    'Hoje',
          month:    'Mês',
          week:     'Semana',
          day:      'Dia'
        },
        header: {
          left: 'prev,next,today',
          center: 'title',
          right: 'prevYear,nextYear'
        },
        events: [{
          title: 'All Day Event',
          start: yearMonth + '-01'
      },
      {
          title: 'Long Event',
          start: yearMonth + '-07',
          end: yearMonth + '-10'
      },
      {
          id: 999,
          title: 'Repeating Event',
          start: yearMonth + '-09T16:00:00'
      },
      {
          id: 999,
          title: 'Repeating Event',
          start: yearMonth + '-16T16:00:00'
      },
      {
          title: 'Conference',
          start: yearMonth + '-11',
          end: yearMonth + '-13'
      },
      {
          title: 'Meeting',
          start: yearMonth + '-12T10:30:00',
          end: yearMonth + '-12T12:30:00'
      },
      {
          title: 'Lunch',
          start: yearMonth + '-12T12:00:00'
      },
      {
          title: 'Meeting',
          start: yearMonth + '-12T14:30:00'
      },
      {
          title: 'Happy Hour',
          start: yearMonth + '-12T17:30:00'
      },
      {
          title: 'Dinner',
          start: yearMonth + '-12T20:00:00'
      },
      {
          title: 'Birthday Party',
          start: yearMonth + '-13T07:00:00'
      },
      {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: yearMonth + '-28'
      }] 
      };
  }

}