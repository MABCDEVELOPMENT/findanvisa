import { Tipo } from "@app/queryrecords/modelquery/tipo.model";
import { Categoria } from "@app/queryrecords/modelquery/categoria.model";

export class Produto {
    
    codigo:number;

	nome:string;

	numeroRegistro:string;

	tipo: Tipo;

	categoria: Categoria;

	situacaoRotulo:string;

	dataVencimento:Date;

	mesAnoVencimento:string;

	dataVencimentoRegistro:Date;

	principioAtivo:string;

	situacaoApresentacao:string;

    dataRegistro:Date;

	numeroRegistroFormatado:string;

	mesAnoVencimentoFormatado:string;

	acancelar:boolean;

	ano:string;

}