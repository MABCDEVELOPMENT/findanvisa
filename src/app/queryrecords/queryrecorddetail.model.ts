export class QueryRecordDetail {	

 category:number; 
 option:number;
 value:string;
 
    constructor(category:number, 
        option:number,
        value:string) {
            this.category=category; 
            this.option=option;
            this.value=value;
    }
}