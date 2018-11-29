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
import { QueryRecordProcessParameter } from "@app/queryrecords/queryrecordprocessparameter.model";
import { FilterProcessService } from "@app/queryrecords/queryrecordprocess-list/process/filter-service-process";

@Component({
    selector: 'table-cosmetic-notification',
    templateUrl: './table-cosmetic-notification.html',
    styleUrls: ['./table-cosmetic-notification.scss']

})
export class TableCosmeticNotificationComponent implements OnInit, AfterViewInit {

    ELEMENT_DATA: any[] = [];

    sortedData: any[];

    dataSource = new MatTableDataSource(this.ELEMENT_DATA);

    queryRecordProcessParameter: QueryRecordProcessParameter;

    data: any;

    error: string;

    displayedColumns = ['dataAlteracao', 'dataRegistro', 'qtdRegistro', 'subject', 'process', 'officehour', 'transaction', 'product', 'situation', 'maturity']; //,'company', 'statusMaturity'

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('paginator') paginator: MatPaginator;
    @ViewChild('filter') filter: ElementRef;
    @ViewChild('table') table: MatTableModule;


    constructor(public dialog: MatDialog,
        private route: ActivatedRoute,
        public parent: FilterService,
        public parentProcess: FilterProcessService,
        private _location: Location,
        private router: Router,
        public dataService: QueryrecordsService,
        public spinnerService: Ng4LoadingSpinnerService,
        private ref: ChangeDetectorRef) {

        this.sortedData = this.ELEMENT_DATA.slice();
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

        this.ELEMENT_DATA = this.parent.data['content'];
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource._updatePaginator;
        this.spinnerService.hide();
    }

    exportAsExcel() {
        let usersJsons: Array<any>[] = new Array<any>(this.ELEMENT_DATA.length);
        let i = 0;
        for (let index = 0; index < this.ELEMENT_DATA.length; index++) {
            let usersJson = Array.of(JSON.stringify(this.ELEMENT_DATA[index]));
            usersJsons[index] = usersJson;
        }
        this.exportExcel(usersJsons);
    }
    exportExcel(data: any[]) {

        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        var today = new Date();
        var date = today.getFullYear() + '' + (today.getMonth() + 1) + '' + today.getDate();
        var time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
        var name = this.parent.user.userName + " " + date + time;

        XLSX.writeFile(workbook, name + '.xls', { bookType: 'xls', type: 'buffer' });
    }

    showMsg(message: string): void {
        this.dialog.open(ErrorDialogComponent, {
            data: { errorMsg: message }, width: '250px', height: '250px'
        });

    }

    loadProcess(process: string) {
        this.queryRecordProcessParameter = new QueryRecordProcessParameter(null,
            null,
            process,
            null,
            null,
            null,
            null);

        this.spinnerService.show();
        this.dataService.getQueryProcessoRegisters(this.queryRecordProcessParameter)
            .then(
                data => {
                    this.data = data;
                    this.parentProcess.data = this.data;
                    this.router.navigate(['/queryRecordProcess/table-process'], { replaceUrl: false });

                }).catch(
                    error => {
                        this.error = error.error.errorMessage;
                        this.spinnerService.hide();
                        this.showMsg(this.error);

                    });
    }

    getDetail(content: any) {

        this.spinnerService.show();
        this.parent.detail = content['contentCosmeticNotificationDetail'];
        this.router.navigate(['queryRecord/detail-cosmetic-notification'], { replaceUrl: false });
        this.spinnerService.hide();

        /* this.spinnerService.show();
         this.dataService.getQueryRegistersDetail(this.parent.category, this.parent.option, content.processo)
             .then(
                 data => {
                     this.parent.detail = data['contentObject'];
                     this.router.navigate(['/queryRecord/detail-cosmetic-notification'], { replaceUrl: false });
                     this.spinnerService.hide();
                 }).catch(
                     error => {
                         this.error = error.error.errorMessage;
                         this.spinnerService.hide();
                         this.showMsg(this.error);
 
                     });*/

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



        this.sortedData = this.ELEMENT_DATA.sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            switch (sort.active) {
                case 'subject': return compare(a['assunto'], b['assunto'], isAsc);
                case 'process': return compare(a['processo'], b['processo'], isAsc);
                case 'officehour': return compare(new Number(a['expedienteProcesso']), new Number(b['expedienteProcesso']), isAsc);
                case 'transaction': return compare(new Number(a['transacao']), new Number(b['transacao']), isAsc);
                case 'product': return compare(a['produto'], b['produto'], isAsc);
                case 'situation': return compare(a['situacao'], b['situacao'], isAsc);
                case 'maturity': {

                    return compare(dateNumber(a['vencimento']), dateNumber(b['vencimento']), isAsc);
                }
                case 'dataAlteracao': {

                    return compare(dateNumber(a['dataAlteracao']), dateNumber(b['dataAlteracao']), isAsc);
                }
                case 'dataRegistro': {

                    return compare(dateNumber(a['dataRegistro']), dateNumber(b['dataRegistro']), isAsc);
                }
                case 'qtdRegistro': return compare(new Number(a['qtdRegistro']), new Number(b['qtdRegistro']), isAsc);
                case 'statusMaturity': return compare(a['statusVencimento'], b['statusVencimento'], isAsc);
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

function compare(a: any, b: any, isAsc: any) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

function compareDate(a: Date, b: Date, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

function dateNumber(strDate: string) {

    if (strDate && strDate != "") {

        let day: string = strDate.substring(0, 2);
        let month: string = strDate.substring(3, 5)
        let year: string = strDate.substring(6, 10);

        return new Number(year + month + day)

    } else {

        return 0;

    }

} 