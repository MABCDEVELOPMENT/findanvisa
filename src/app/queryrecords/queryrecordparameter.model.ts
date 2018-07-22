    
export class QueryRecordParameter {	
	
	cnpj:string;
	
	numberProcess:string;
	
	productName:string;
	
	brand:string;
	
	category:number;
	
	registerNumber:string;
	
	typeProdutc:number;

	constructor(cnpj:string,
		numberProcess:string,
		productName:string,
		brand:string,
		category:number,
		registerNumber:string,
		typeProdutc:number){
		
		this.cnpj = cnpj;
		this.numberProcess = numberProcess;
		this.productName = productName;
		this.brand = brand;
		this.category = category;
		this.registerNumber = registerNumber;
		this.typeProdutc = typeProdutc;	

	}

}	