import { Component, Inject, ViewChild, ElementRef, OnInit, ChangeDetectorRef, AfterViewInit } from "@angular/core";
import { TableComponent } from "@app/queryrecords/queryrecord-list/table/table-component";
import { MatTableDataSource, MatPaginator, MatSort, MatTableModule } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import * as XLSX from 'xlsx';
import { Content } from "@app/queryrecords/modelquery/content.model";
import { FilterService } from "@app/queryrecords/queryrecord-list/table/filter-service";
import { extend } from "webdriver-js-extender";
import { QueryrecordsService } from "@app/queryrecords/queryrecords.service";
import { Location } from "@angular/common";

@Component({
    selector: 'detail-cosmetic-notification',
    templateUrl: './detail-cosmetic-notification.html',
    styleUrls:['./detail-cosmetic-notification.scss']
})
export class DetailCosmeticNotificationComponent implements OnInit,AfterViewInit  {

    content:any;
    apresentacoes:any;

    constructor(private route: ActivatedRoute,
        public parent: FilterService,
        private _location: Location,
        public spinnerService: Ng4LoadingSpinnerService,
        private ref: ChangeDetectorRef){

    }
  

    ngOnInit() {
        this.content = this.parent.detail;
        this.apresentacoes = this.content.apresentacoes;
    }
      
    ngAfterViewInit() {

    }

    goBack () {
        this._location.back();
    }

}