import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
import {HttpClient } from '@angular/common/http';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AuthenticationService } from '@app/core';
import { QueryRecordParameter } from '@app/queryrecords/queryrecordparameter.model';
import { Content } from '@app/queryrecords/modelquery/content.model';
import { QueryRecordProcessParameter } from '@app/queryrecords/queryrecordprocessparameter.model';
import { QueryRecordDetail } from '@app/queryrecords/queryrecorddetail.model';
import { QueryRecordLogParameter } from './queryrecordlogparameter.model';

@Injectable()
export class QueryrecordsService {
  private readonly API_URL = '/anvisa';
  
  dataChange: Observable<Content[]> = new Observable<Content[]>();
  // Temporarily stores data from dialogs
  dialogData: any;
  queryRecordDetail: QueryRecordDetail;
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor (private httpClient: HttpClient,
                public autenticeService: AuthenticationService) {
     
  }

  get data(): Observable<Content[]> {
    return this.dataChange;
  }

  getQueryRegisters(queryrecordparameter: QueryRecordParameter): Promise<any> {

     return this.httpClient.post(this.API_URL+'/product',queryrecordparameter).timeout(800000).toPromise()
    .then(response => response)
    .catch(error=> Observable.throw(error.message));
  }

  getQueryProcessoRegisters(queryrecordprocessparameter: QueryRecordProcessParameter): Promise<any> {

      return this.httpClient.post(this.API_URL+'/process',queryrecordprocessparameter).timeout(800000).toPromise()
     .then(response => response)
     .catch(error=> Observable.throw(error.message));
  }

  getQueryLogRegisters(queryrecordlogparameter: QueryRecordLogParameter): Promise<any> {

    return this.httpClient.post(this.API_URL+'/log',queryrecordlogparameter).timeout(800000).toPromise()
   .then(response => response)
   .catch(error=> Observable.throw(error.message));
  }

  getQueryAreas(): Promise<any> {

    return this.httpClient.get(this.API_URL+'/areas').toPromise()
   .then(response => response)
   .catch(error=> Observable.throw(error.message));
 }

 getQueryLabel(label:string): Promise<any> {

  return this.httpClient.get(this.API_URL+'/productLabel/'+label).toPromise()
 .then(response => response)
 .catch(error=> Observable.throw(error.message));
}

getQueryRegistersDetail(category:number,option:number,value:string): Promise<any> {
  
  this.queryRecordDetail = new QueryRecordDetail(null,category,option,value);
  return this.httpClient.post(this.API_URL+'/productDetial',this.queryRecordDetail).toPromise()
 .then(response => response)
 .catch(error=> Observable.throw(error.message));
}

getQueryRegistersDetailCosmeticItem(process:string,option:number,value:string): Promise<any> {
  
  this.queryRecordDetail = new QueryRecordDetail(process,null,option,value);
  return this.httpClient.post(this.API_URL+'/findProductCosmetcDetail',this.queryRecordDetail).toPromise()
 .then(response => response)
 .catch(error=> Observable.throw(error.message));
}



getQueryRegistersProcessDetail(category:number,option:number,value:string): Promise<any> {
  
  this.queryRecordDetail = new QueryRecordDetail(null,category,option,value);
  return this.httpClient.post(this.API_URL+'/processDetail',this.queryRecordDetail).toPromise()
 .then(response => response)
 .catch(error=> Observable.throw(error.message));
}
  
}
