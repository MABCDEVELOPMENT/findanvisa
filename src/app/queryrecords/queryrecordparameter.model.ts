    
export class QueryRecordParameter {	
	
	cnpj:string;
	
	numberProcess:string;
	
	productName:string;
	
	brand:string;
	
	category:number;

	option:number;
	
	registerNumber:string;
	
	typeProdutc:number;

	// Cosméticos Registrados
	authorizationNumber:string;
		  
	expedientProcess:string;
		  
	generatedTransaction:string;

    expeditionPetition:string;
	
	dateInitial:string;
	dateFinal:string;  
	
	eanCode:string;

	constructor(cnpj:string,
		numberProcess:string,
		productName:string,
		brand:string,
		category:number,
		option:number,
		registerNumber:string,
		typeProdutc:number,
		// Cosméticos Registrados
		authorizationNumber:string,
		expedientProcess:string,
		generatedTransaction:string,
		expeditionPetition:string,
		dateInitial:string,
		dateFinal:string,
		eanCode:string){
		
		this.cnpj = cnpj;
		this.numberProcess = numberProcess;
		this.productName = productName;
		this.brand = brand;
		this.category = category;
		this.option = option;
		this.registerNumber = registerNumber;
		this.typeProdutc = typeProdutc;	

		// Cosméticos Registrados
		this.authorizationNumber = authorizationNumber;
		this.expedientProcess    = expedientProcess;
		this.generatedTransaction= generatedTransaction;
		this.expeditionPetition  = expeditionPetition;
		this.dateInitial         = dateInitial;
		this.dateInitial         = dateFinal;
		this.eanCode 			 = eanCode;

	}

}	