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
    selector: 'detail-seneante-product',
    templateUrl: './detail-seneante-product.html',
    styleUrls:['./detail-seneante-product.scss']
})
export class DetailSaneanteProductComponent implements OnInit,AfterViewInit  {

    content:any;

    constructor(private route: ActivatedRoute,
        public parent: FilterService,
        private _location: Location,
        private router: Router,
        public spinnerService: Ng4LoadingSpinnerService,
        private ref: ChangeDetectorRef){

    }
  

    ngOnInit() {
        this.content = this.parent.detail;
    }
      
    ngAfterViewInit() {

    }


    getLabel(id:any) {

        this.spinnerService.show();
        this.parent.processo = this.content.processo;
        this.parent.rotulo = id;
        this.router.navigate(['/queryRecord/label-saneante-product'], { replaceUrl: false });
        this.spinnerService.hide();
  
    }

    goBack () {
        this._location.back();
    }

}