import { Content } from "@app/queryrecords/modelquery/content.model";


export class RootObject {
    
    content:Content[];

    totalElements:number;

    totalPages:number;

	last:boolean;

    numberOfElements:number;

	sort:string;

	first:boolean;

	size:number;

	number:number;

}