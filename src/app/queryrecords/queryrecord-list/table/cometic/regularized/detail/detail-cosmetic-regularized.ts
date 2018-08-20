import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { FilterService } from "@app/queryrecords/queryrecord-list/table/filter-service";
import { Location } from "@angular/common";

@Component({
    selector: 'detail-cosmetic-regularized',
    templateUrl: './detail-cosmetic-regularized.html',
    styleUrls:['./detail-cosmetic-regularized.scss']
})
export class DetailCosmeticRegularizedComponent implements OnInit,AfterViewInit  {

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