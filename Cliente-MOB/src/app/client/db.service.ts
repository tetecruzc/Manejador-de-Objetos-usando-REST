import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class DBService {

  constructor(private http:HttpClient) {}

  api = 'api';
  view = 'menu';

  getObjects(): Observable<any> {
    return this.http.get(`${this.api}/consultar`);
  }

  createObject(objeto: any) {
    return this.http.post(`${this.api}/crear`, objeto);
  }

}