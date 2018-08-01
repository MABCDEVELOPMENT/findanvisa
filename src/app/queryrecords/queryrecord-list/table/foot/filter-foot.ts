import { Component } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
    selector: 'filter-foot',
    templateUrl: './filter-foot.html'
})
export class FilterFootComponent {
    
    private cnpjProcessFood    = [ /\d/ , /\d/, /\d/ , /\d/, /\d/,'.', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '/', /\d/ , /\d/,];

    formFilter: FormGroup;
   
    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.formFilter =  new FormGroup({
          product: new FormControl('', []),
          process: new FormControl('', []),
          brand: new FormControl('', []),
          numberRegister:new FormControl('', [])
        });
    }
    
    get getFormFilter(){
        return this.formFilter;
    }
}