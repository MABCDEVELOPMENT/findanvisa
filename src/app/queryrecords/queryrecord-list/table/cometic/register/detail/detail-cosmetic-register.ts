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
    selector: 'detail-cosmetic-register',
    templateUrl: './detail-cosmetic-register.html',
    styleUrls:['./detail-cosmetic-register.scss']
})
export class DetailCosmeticRegisterComponent implements OnInit,AfterViewInit  {

    content:any;
    apresentacoes:any;
    peticoes:any;

    constructor(private route: ActivatedRoute,
        public parent: FilterService,
        private _location: Location,
        public spinnerService: Ng4LoadingSpinnerService,
        private ref: ChangeDetectorRef){

    }
  

    ngOnInit() {
        this.content = this.parent.detail;
        this.apresentacoes = this.content.apresentacoes;
        this.peticoes = this.content.peticoes;
    }
      
    ngAfterViewInit() {

    }

    goBack () {
        this._location.back();
    }

}