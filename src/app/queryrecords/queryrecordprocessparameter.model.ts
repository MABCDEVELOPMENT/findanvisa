
export class QueryRecordProcessParameter {	
    
    cnpj:string;
    area:any;
    process:string;
    transaction:string;
    protocol:string;
    officehour:string;
    knowledge:string;

    constructor(cnpj:string,
        area:any,
        process:string,
        transaction:string,
        protocol:string,
        officehour:string,
        knowledge:string) {
        this.cnpj        = cnpj;    
        this.area        = area;
        this.process     = process;
        this.transaction = transaction;
        this.protocol    = protocol;
        this.officehour  = officehour;
        this.knowledge   = knowledge;
    }    
}    