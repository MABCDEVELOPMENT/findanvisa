import { Component, OnInit, AfterViewInit} from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { QueryRecordParameter } from "@app/queryrecords/queryrecordparameter.model";
import { QueryrecordsService } from "@app/queryrecords/queryrecords.service";
import { AuthenticationService, I18nService } from "@app/core";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import { ErrorDialogComponent } from "@app/core/message/error-dialog.component";
import { FilterService } from "@app/queryrecords/queryrecord-list/table/filter-service";

@Component({
    selector: 'filter-foot',
    templateUrl: './filter-foot.html'
})
export class FilterFootComponent implements OnInit {

    private cnpjProcessFood = [/\d/, /\d/, /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '/', /\d/, /\d/,];

    formFilter: FormGroup;

    queryRecordParameter: QueryRecordParameter;

    cnpj: string;
    category: number;
    option: number;
    error: string;
    data: any;


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

    createForm() {
        this.formFilter = new FormGroup({
            product: new FormControl('', []),
            process: new FormControl('', []),
            brand: new FormControl('', []),
            numberRegister: new FormControl('', [])
        });
    }

    loadData() {


            this.queryRecordParameter = new QueryRecordParameter(this.filterService.cnpj,
                this.formFilter.controls.process.value,
                this.formFilter.controls.product.value,
                this.formFilter.controls.brand.value,
                this.filterService.category,
                this.filterService.option,
                this.formFilter.controls.numberRegister.value,
                0,
                //Pametros nulos para Categoria cosmetico produtos registrados
                null,
                null,
                null,
                null,
                null,
                null,
                //Pametros nulos para Categoria cosmetico produtos notificados
                null);

                
            this.spinnerService.show();
            this.dataService.getQueryRegisters(this.queryRecordParameter)
                .then(
                    data => {
                        this.data = data;
                        this.filterService.data = this.data;
                        this.router.navigate(['/queryRecord/table-foot'], { replaceUrl: false });
                        this.spinnerService.hide();
                    }).catch(
                        error => {
                            this.error = error.error.errorMessage;
                            this.spinnerService.hide();
                            this.showMsg(this.error);

                        });
        }
    

    showMsg(message: string): void {
        this.dialog.open(ErrorDialogComponent, {
            data: { errorMsg: message }, width: '250px', height: '250px'
        });

    }
}    