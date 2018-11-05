    
export class QueryRecordLogParameter {	
	
	cnpj:string;
	category:number;
	option:number;
	dateInitial:string;
	dateFinal:string;  

	constructor(cnpj:string,
		category:number,
		option:number,
		dateInitial:string,
		dateFinal:string){
		
		this.cnpj = cnpj;
		this.category = category;
		this.option = option;
		this.dateInitial         = dateInitial;
		this.dateInitial         = dateFinal;
	}

}	