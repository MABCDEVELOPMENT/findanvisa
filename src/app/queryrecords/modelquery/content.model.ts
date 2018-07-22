import { Produto } from "@app/queryrecords/modelquery/produto.model";
import { Empresa } from "@app/queryrecords/modelquery/empresa.model";
import { Processo } from "@app/queryrecords/modelquery/processo.model";
import { Peticao } from "@app/queryrecords/modelquery/peticao.model";

export class Content {

    ordem:number;

	produto:Produto;

	empresa:Empresa;

	processo:Processo;

	peticao:Peticao;

	area:string;

}