import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { FilterService } from "@app/queryrecords/queryrecord-list/table/filter-service";
import { Location } from "@angular/common";

@Component({
    selector: 'register-apresentation',
    templateUrl: './register-apresentation.html',
    styleUrls:['./register-apresentation.scss']
})
export class RegisterApresentationComponent implements OnInit,AfterViewInit  {

    content:any;
    apresentacoes:any;
    peticoes:any;

    constructor(private route: ActivatedRoute,
        public parent: FilterService,
        private _location: Location,
        public spinnerService: Ng4LoadingSpinnerService,
        private ref: ChangeDetectorRef){

    }
  

    ngOnInit() {
        this.content = this.parent.detail;
        this.apresentacoes = this.content.apresentacoes;
        this.peticoes = this.content.peticoes;
    }
      
    ngAfterViewInit() {

    }

    goBack () {
        this._location.back();
    }
    maskCnpj(valor: string):string {
        return valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5");
    }

}