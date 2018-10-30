import { Component, Inject, ViewChild, ElementRef, OnInit, ChangeDetectorRef, AfterViewInit } from "@angular/core";
import { TableComponent } from "@app/queryrecords/queryrecord-list/table/table-component";
import { MatTableDataSource, MatPaginator, MatSort, MatTableModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import * as XLSX from 'xlsx';
import { Content } from "@app/queryrecords/modelquery/content.model";
import { FilterService } from "@app/queryrecords/queryrecord-list/table/filter-service";
import { extend } from "webdriver-js-extender";
import { QueryrecordsService } from "@app/queryrecords/queryrecords.service";
import { Location } from "@angular/common";
import { I18nService } from "@app/core";

@Component({
    selector: 'detail-foot',
    templateUrl: './detail-foot.html',
    styleUrls:['./detail-foot.scss']
})
export class DetailFootComponent  {

    content:any;

    // constructor(private route: ActivatedRoute,
    //     public dialogRef: MatDialogRef<DetailFootComponent>,
    //     public parent: FilterService,
    //     @Inject(MAT_DIALOG_DATA) public data: any,
    //     private _location: Location,
    //     public spinnerService: Ng4LoadingSpinnerService,
    //     private ref: ChangeDetectorRef){

    // }

    constructor(private dialogRef: MatDialogRef<DetailFootComponent>, 
        private i18nService: I18nService,   
        public parent: FilterService,
        @Inject(MAT_DIALOG_DATA) public data : any) {

    }
  

    ngOnInit() {
        this.content = this.parent.detail;
    }
      
    ngAfterViewInit() {

    }

    onConfirm() {
        this.dialogRef.close(true);
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }

    goBack () {
        this.dialogRef.close(false);
    }
    
    maskCnpj(valor: string):string {
        return valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5");
    }

}