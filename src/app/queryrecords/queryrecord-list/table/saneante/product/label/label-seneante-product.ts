import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { FilterService } from "@app/queryrecords/queryrecord-list/table/filter-service";
import { Location } from "@angular/common";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "@env/environment.prod";
import { QueryrecordsService } from "@app/queryrecords/queryrecords.service";
import { ErrorDialogComponent } from "@app/core/message/error-dialog.component";
import { MatDialog } from "@angular/material";

@Component({
    selector: 'label-seneante-product',
    templateUrl: './label-seneante-product.html',
    styleUrls:['./label-seneante-product.scss']
})
export class LabelSaneanteProductComponent implements OnInit,AfterViewInit  {

    content:any;
    
    imageToShow:any;

    isImageLoading: boolean;
    error: string;

    constructor(public dialog: MatDialog,
        private route: ActivatedRoute,
        public http: HttpClient,
        public dataService: QueryrecordsService,
        public parent: FilterService,
        private _location: Location,
        public spinnerService: Ng4LoadingSpinnerService,
        private ref: ChangeDetectorRef){

    }
  

    ngOnInit() {
        this.content = this.parent.detail;
        this.imageToShow = environment.serverUrl+ "/findimage/produto/rotulo_"+this.parent.rotulo+".jpg";
    }
      
    ngAfterViewInit() {
        
    }

    download(url:string) {
        const a = document.createElement('a');
        a.href = url;
        a.download = "rotulo_"+this.parent.rotulo+".jpg";
        document.body.appendChild(a);
        a.click();
    }
    goBack () {
        this._location.back();
    }

}