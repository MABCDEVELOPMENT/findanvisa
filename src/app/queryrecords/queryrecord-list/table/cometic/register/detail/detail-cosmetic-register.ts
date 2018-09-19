import { Component, Inject, ViewChild, ElementRef, OnInit, ChangeDetectorRef, AfterViewInit } from "@angular/core";
import { TableComponent } from "@app/queryrecords/queryrecord-list/table/table-component";
import { MatTableDataSource, MatPaginator, MatSort, MatTableModule, MatDialog } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import * as XLSX from 'xlsx';
import { Content } from "@app/queryrecords/modelquery/content.model";
import { FilterService } from "@app/queryrecords/queryrecord-list/table/filter-service";
import { extend } from "webdriver-js-extender";
import { QueryrecordsService } from "@app/queryrecords/queryrecords.service";
import { Location } from "@angular/common";
import { ErrorDialogComponent } from "@app/core/message/error-dialog.component";

@Component({
    selector: 'detail-cosmetic-register',
    templateUrl: './detail-cosmetic-register.html',
    styleUrls:['./detail-cosmetic-register.scss']
})
export class DetailCosmeticRegisterComponent implements OnInit,AfterViewInit  {

    content:any;
    apresentacoes:any;
    peticoes:any;

    
    data: any;

    error: string;

    constructor(private route: ActivatedRoute,
        public dialog: MatDialog,
        public parent: FilterService,
        private _location: Location,
        public dataService: QueryrecordsService,
        private router: Router,        
        public spinnerService: Ng4LoadingSpinnerService,
        private ref: ChangeDetectorRef){

    }
  

    ngOnInit() {
        this.content = this.parent.detail;
        this.apresentacoes = this.content.apresentacoes;
        this.peticoes = this.content.peticoes;
    }
    
    getDetailApresentation(value: any) {

        this.spinnerService.show();
        this.dataService.getQueryRegistersDetailCosmeticItem(this.content.processo,0,value)
            .then(
                data => {
                    this.parent.datailItem = data['contentObject'];
                    this.router.navigate(['/queryRecord/detail-cosmetic-register-apresentation'], { replaceUrl: false });
                    this.spinnerService.hide();
                }).catch(
                    error => {
                        this.error = error.error.errorMessage;
                        this.spinnerService.hide();
                        this.showMsg(this.error);

                    });

    }
    getDetailPetition(value: any) {

        this.spinnerService.show();
        this.dataService.getQueryRegistersDetailCosmeticItem(this.content.processo,1,value)
            .then(
                data => {
                    this.parent.datailItem = data['contentObject'];
                    this.router.navigate(['/queryRecord/detail-cosmetic-register-petition'], { replaceUrl: false });
                    this.spinnerService.hide();
                }).catch(
                    error => {
                        this.error = error.error.errorMessage;
                        this.spinnerService.hide();
                        this.showMsg(this.error);

                    });

    }

    ngAfterViewInit() {

    }

    showMsg(message: string): void {
        this.dialog.open(ErrorDialogComponent, {
            data: { errorMsg: message }, width: '250px', height: '250px'
        });

    }
    
    goBack () {
        this._location.back();
    }
    maskCnpj(valor: string):string {
        return valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5");
    }

}