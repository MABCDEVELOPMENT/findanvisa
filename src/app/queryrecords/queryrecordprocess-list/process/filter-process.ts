import { Component, OnInit, AfterViewInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import { FilterService } from "@app/queryrecords/queryrecord-list/table/filter-service";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { QueryrecordsService } from "@app/queryrecords/queryrecords.service";
import { AuthenticationService, I18nService } from "@app/core";
import { ErrorDialogComponent } from "@app/core/message/error-dialog.component";
import { QueryRecordProcessParameter } from "@app/queryrecords/queryrecordprocessparameter.model";

@Component({
    selector: 'filter-process',
    templateUrl: './filter-process.html'
})
export class FilteProcessComponent implements OnInit, AfterViewInit {

    private cnpjProcessMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
    private authorizationNumberMask = [/\d/, '.', /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/];
    private expedientMask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];

    formFilter: FormGroup;

    queryRecordProcessParameter: QueryRecordProcessParameter;

    cnpj: string;
    category: number;
    option: number;
    error: string;
    data: any;

    areas: any;
    selectedArea: any;


    constructor(public dialog: MatDialog,
        private router: Router,
        private filterService: FilterService,
        private spinnerService: Ng4LoadingSpinnerService,
        public dataService: QueryrecordsService,
        private authenticationService: AuthenticationService,
        public i18nService: I18nService) {

    }

    ngOnInit() {
        this.createForm();
    }

    ngAfterViewInit() {
        this.loadAreas();
    }

    createForm() {
        this.formFilter = new FormGroup({
            area: new FormControl('', []),
            process: new FormControl('', []),
            transaction: new FormControl('', []),
            protocol: new FormControl('', []),
            officehour: new FormControl('', []),
            knowledge: new FormControl('', [])
        });
    }

    loadData() {


        this.queryRecordProcessParameter = new QueryRecordProcessParameter(this.filterService.cnpj,
            this.formFilter.controls.area.value,
            this.formFilter.controls.process.value,
            this.formFilter.controls.transaction.value,
            this.formFilter.controls.protocol.value,
            this.formFilter.controls.officehour.value,
            this.formFilter.controls.knowledge.value);

        this.spinnerService.show();
        this.dataService.getQueryProcessoRegisters(this.queryRecordProcessParameter)
            .then(
                data => {
                    this.data = data;
                    this.filterService.data = this.data;
                    this.router.navigate(['/queryRecordProcess/table-process'], { replaceUrl: false });
                    this.spinnerService.hide();
                }).catch(
                    error => {
                        this.error = error.error.errorMessage;
                        this.spinnerService.hide();
                        this.showMsg(this.error);

                    });
    }

    loadAreas() {
        this.dataService.getQueryAreas()
            .then(
                data => {
                    this.areas = data;
                },
                error => {
                    this.error = error.error.errorMessage;
                    this.showMsg(this.error);
                });
    }

    showMsg(message: string): void {
        this.dialog.open(ErrorDialogComponent, {
            data: { errorMsg: message }, width: '250px', height: '250px'
        });

    }
}