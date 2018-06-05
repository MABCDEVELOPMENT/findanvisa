import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from 'ng-fullcalendar';

import { DashBoardComponent } from '@app/dashboard/dashboard.component';


@NgModule({
  imports: [
    CommonModule,
    FullCalendarModule
  ],
  declarations: [DashBoardComponent],
  exports: [DashBoardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule { }
