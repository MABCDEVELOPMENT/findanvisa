    
export class QueryRecordParameter {	
	
	cnpj:string;
	
	numberProcess:string;
	
	productName:string;
	
	brand:string;
	
	category:number;

	option:number;
	
	registerNumber:string;
	
	typeProdutc:number;

	// Cosmeticos Registrados
	authorizationNumber:string;
		  
	expedientProcess:string;
		  
	generatedTransaction:string;

    expeditionPetition:string;
	
	dateInitial:string;
    dateFinal:string;  

	constructor(cnpj:string,
		numberProcess:string,
		productName:string,
		brand:string,
		category:number,
		option:number,
		registerNumber:string,
		typeProdutc:number,
		// Cosmeticos Registrados
		authorizationNumber:string,
		expedientProcess:string,
		generatedTransaction:string,
		expeditionPetition:string,
		dateInitial:string,
		dateFinal:string){
		
		this.cnpj = cnpj;
		this.numberProcess = numberProcess;
		this.productName = productName;
		this.brand = brand;
		this.category = category;
		this.option = option;
		this.registerNumber = registerNumber;
		this.typeProdutc = typeProdutc;	

		// Cosmeticos Registrados
		this.authorizationNumber = authorizationNumber;
		this.expedientProcess    = expedientProcess;
		this.generatedTransaction= generatedTransaction;
		this.expeditionPetition  = expeditionPetition;
		this.dateInitial         = dateInitial;
		this.dateInitial         = dateFinal;

	}

}	