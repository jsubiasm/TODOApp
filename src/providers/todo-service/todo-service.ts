import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TodoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodoServiceProvider {

  constructor(public http: HttpClient) {
  }

  getNotas() {
    return this.http.get('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/todoapp-rufkc/service/TODOService/incoming_webhook/getNotas');
  }

}
