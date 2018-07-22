export class Processo {

	situacao:string;

	numero:string;

	ativo:boolean;

    numeroProcessoFormatado:string;
    
	public Processo(numero:string, ativo:boolean) {
		this.numero = numero;
		this.ativo = ativo;
	}

	constructor(numero:string, situacao:string, numeroProcessoFormatado:string) {
		this.numero = numero;
		this.situacao = situacao;
		this.numeroProcessoFormatado = numeroProcessoFormatado;
	}

}
