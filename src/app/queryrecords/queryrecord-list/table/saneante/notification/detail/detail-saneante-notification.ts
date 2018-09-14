import { Component, Inject, ViewChild, ElementRef, OnInit, ChangeDetectorRef, AfterViewInit } from "@angular/core";
import { TableComponent } from "@app/queryrecords/queryrecord-list/table/table-component";
import { MatTableDataSource, MatPaginator, MatSort, MatTableModule } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import * as XLSX from 'xlsx';
import { Content } from "@app/queryrecords/modelquery/content.model";
import { FilterService } from "@app/queryrecords/queryrecord-list/table/filter-service";
import { extend } from "webdriver-js-extender";
import { QueryrecordsService } from "@app/queryrecords/queryrecords.service";
import { Location } from "@angular/common";

@Component({
    selector: 'detail-saneante-notification',
    templateUrl: './detail-saneante-notification.html',
    styleUrls:['./detail-saneante-notification.scss']
})
export class DetailSaneanteNotificationComponent implements OnInit,AfterViewInit  {

    content:any;
    apresentacoes:any;
    peticoes:any;

    constructor(private route: ActivatedRoute,
        public parent: FilterService,
        private _location: Location,
        private router: Router,
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

    getLabel(id:any) {

        this.spinnerService.show();
        this.parent.processo = this.content.processo;
        this.parent.rotulo = id;
        this.router.navigate(['/queryRecord/label-saneante-notification'], { replaceUrl: false });
        this.spinnerService.hide();
  
    }

}