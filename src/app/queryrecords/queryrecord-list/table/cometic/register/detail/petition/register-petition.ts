import { Component, OnInit, ChangeDetectorRef, AfterViewInit, Renderer2, Inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { FilterService } from "@app/queryrecords/queryrecord-list/table/filter-service";
import { Location } from "@angular/common";
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from "@angular/material";
import { I18nService } from "@app/core";
import { OverlayContainer } from "@angular/cdk/overlay";

@Component({
    selector: 'register-petition',
    templateUrl: './register-petition.html',
    styleUrls:['./register-petition.scss']
})
export class RegisterPetitionComponent implements OnInit,AfterViewInit  {

    contentItem:any;
    apresents:any;
    peticoes:any;

    /*constructor(private route: ActivatedRoute,
        public parent: FilterService,
        private _location: Location,
        public spinnerService: Ng4LoadingSpinnerService,
        private ref: ChangeDetectorRef){

        }*/
  
    constructor(private dialogRef: MatDialogRef<RegisterPetitionComponent>, 
        private i18nService: I18nService,  
        public dialog: MatDialog, 
        public parent: FilterService,
        private renderer: Renderer2,
        public overlayC: OverlayContainer,
        @Inject(MAT_DIALOG_DATA) public data : any) {
            const overlay = overlayC.getContainerElement();
            this.contentItem = data.detail;

    }

    ngOnInit() {
        this.contentItem = this.parent.datailItem;
        this.apresents = this.parent.datailItem.apresentacoes;
        this.peticoes = this.contentItem.peticoes;
    }
      
    ngAfterViewInit() {

    }

    goBack () {
        this.dialogRef.close(false);
    }
    maskCnpj(valor: string):string {
        return valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5");
    }

}