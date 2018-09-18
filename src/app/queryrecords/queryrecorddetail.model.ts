export class QueryRecordDetail {	

 category:number; 
 process:string;
 option:number;
 value:string;
 
    constructor(
        process:string,
        category:number, 
        option:number,
        value:string) {
            this.process=process;
            this.category=category; 
            this.option=option;
            this.value=value;
    }
}