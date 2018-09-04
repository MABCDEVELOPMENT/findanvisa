import { Component, ViewChild, ElementRef, ChangeDetectorRef, OnInit, AfterViewInit } from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator, MatTableModule, MatDialog, Sort } from "@angular/material";
import { Content } from "@app/queryrecords/modelquery/content.model";
import { ActivatedRoute, Router } from "@angular/router";
import { FilterService } from "@app/queryrecords/queryrecord-list/table/filter-service";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import * as XLSX from 'xlsx';
import { ErrorDialogComponent } from "@app/core/message/error-dialog.component";
import { Location } from "@angular/common";
import { QueryrecordsService } from "@app/queryrecords/queryrecords.service";
import { FilterProcessService } from "@app/queryrecords/queryrecordprocess-list/process/filter-service-process";

@Component({
    selector: 'table-process',
    templateUrl: './table-process.html',
    styleUrls: ['./table-process.scss']
})
export class TableProcessComponent implements OnInit, AfterViewInit {

    ELEMENT_DATA: Content[];

    dataSource = new MatTableDataSource(this.ELEMENT_DATA);

    data: any;

    error: any;

    //displayedColumns = ['subject','process','officehour','transaction','product','company','situation','maturity','statusMaturity'];
    displayedColumns = ['order', 'cnpj', 'socialName', 'process', 'subject'];
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('paginator') paginator: MatPaginator;
    @ViewChild('filter') filter: ElementRef;
    @ViewChild('table') table: MatTableModule;

    sortedData: Content[];

    constructor(public dialog: MatDialog,
        private route: ActivatedRoute,
        public parentProcess: FilterProcessService,
        private _location: Location,
        private router: Router,
        public dataService: QueryrecordsService,
        public spinnerService: Ng4LoadingSpinnerService,
        private ref: ChangeDetectorRef) {

    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    ngOnInit() {

        this.dataSource.filterPredicate = (data: any, filtersJson: string) => {
            const matchFilter: any = [];
            const filters = JSON.parse(filtersJson);

            filters.forEach((filter: any) => {
                // check for null values!
                const val = data[filter.id] === null ? '' : data[filter.id];
                matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
            });

            // Choose one
            return matchFilter.every(Boolean); // AND condition
            // return matchFilter.some(Boolean); // OR condition
        }

    }

    ngAfterViewInit() {

        this.ELEMENT_DATA = this.parentProcess.data['content'];
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource._updatePaginator;

    }

    exportAsExcel() {
        this.exportExcel(this.ELEMENT_DATA);
    }

    exportExcel(data: any[]) {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        var today = new Date();
        var date = today.getFullYear() + '' + (today.getMonth() + 1) + '' + today.getDate();
        var time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
        var name = this.parentProcess.user.userName + " " + date + time;
        // +
        XLSX.writeFile(workbook, name + '.xls', { bookType: 'xls', type: 'buffer' });
    }

    showMsg(message: string): void {
        this.dialog.open(ErrorDialogComponent, {
            data: { errorMsg: message }, width: '250px', height: '250px'
        });

    }

    getDetail(content: any) {

        this.spinnerService.show();
        this.dataService.getQueryRegistersProcessDetail(this.parentProcess.category, this.parentProcess.option, content.processo)
            .then(
                data => {
                    this.parentProcess.detail = data['contentObject'];
                    this.router.navigate(['/queryRecordProcess/detail-process'], { replaceUrl: false });
                    this.spinnerService.hide();
                }).catch(
                    error => {
                        this.error = error.error.errorMessage;
                        this.spinnerService.hide();
                        this.showMsg(this.error);

                    });

    }
    goBack() {
        this._location.back();
    }

    sortData(sort: Sort) {
        const data = this.ELEMENT_DATA.slice();
        if (!sort.active || sort.direction === '') {
          this.sortedData = data;
          return;
        }

        //['order', 'cnpj', 'socialName', 'process', 'subject'];
        this.sortedData = this.ELEMENT_DATA.sort((a, b) => {
          const isAsc = sort.direction === 'asc';
          switch (sort.active) {
            case 'order':   return compare(new Number(a['ordem']), new Number(b['ordem']),  isAsc);
            case 'cnpj':   return compare(a['cnpj'], b['cnpj'], isAsc);
            case 'socialName':   return compare(a['razaoSocial'], b['razaoSocial'], isAsc);
            case 'process':   return compare(new Number(a['processo']), new Number(b['processo']),  isAsc);
            case 'subject':   return compare(a['assunto'], b['assunto'], isAsc);
            default: return 0;
          }
        });

        this.dataSource = new MatTableDataSource(this.sortedData);
        //this.dataSource.sort = this.sort;
       // this.dataSource.sortingDataAccessor = (data, header) => data[header];
        this.dataSource.paginator = this.paginator;
        this.dataSource._updatePaginator;

    }
   
}

function compare(a:any, b:any, isAsc:any) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

function compareDate(a:Date, b:Date, isAsc:boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}