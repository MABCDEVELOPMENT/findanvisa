import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { FilterService } from "@app/queryrecords/queryrecord-list/table/filter-service";
import { Location } from "@angular/common";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "@env/environment.prod";

@Component({
    selector: 'label-seneante-product',
    templateUrl: './label-seneante-product.html',
    styleUrls:['./label-seneante-product.scss']
})
export class LabelSaneanteProductComponent implements OnInit,AfterViewInit  {

    content:any;
    
    imageToShow:any;

    isImageLoading: boolean;

    data:Blob;

    constructor(private route: ActivatedRoute,
        private httpClient: HttpClient,
        public parent: FilterService,
        private _location: Location,
        public spinnerService: Ng4LoadingSpinnerService,
        private ref: ChangeDetectorRef){

    }
  

    ngOnInit() {
        this.content = this.parent.detail;
    }
      
    ngAfterViewInit() {
        ;
    }



    goBack () {
        this._location.back();
    }

}