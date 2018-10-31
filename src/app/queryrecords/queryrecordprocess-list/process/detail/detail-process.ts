import { Component, OnInit, ChangeDetectorRef, AfterViewInit, Renderer2, Inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { Location } from "@angular/common";
import { FilterProcessService } from "@app/queryrecords/queryrecordprocess-list/process/filter-service-process";
import { I18nService } from "@app/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { OverlayContainer } from "@angular/cdk/overlay";

@Component({
    selector: 'detail-process',
    templateUrl: './detail-process.html',
    styleUrls:['./detail-process.scss']
})
export class DetailProcessComponent implements OnInit  {

    content:any;
    apresentacoes:any;

    // constructor(private route: ActivatedRoute,
    //     public parent: FilterProcessService,
    //     private _location: Location,
    //     public spinnerService: Ng4LoadingSpinnerService,
    //     private ref: ChangeDetectorRef){

    // }

    constructor(private dialogRef: MatDialogRef<DetailProcessComponent>, 
        private i18nService: I18nService,   
        public parent: FilterProcessService,
        private renderer: Renderer2,
        public overlayC: OverlayContainer,
        @Inject(MAT_DIALOG_DATA) public data : any) {
            const overlay = overlayC.getContainerElement();
            this.content = data.content.processDetail;
        }
  

    ngOnInit() {
        
    }
      
    goBack () {
        this.dialogRef.close();
    }

}