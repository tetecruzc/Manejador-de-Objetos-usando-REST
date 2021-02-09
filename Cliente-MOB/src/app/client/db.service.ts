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

  deleteObject(id: number): Promise<any> {
    return this.http.delete(`${this.api}/eliminar/${id}`).toPromise();
  }


  replicateObject(accion: string): Promise<{message: string}>{
    console.log('la accion es', accion)
    return this.http.post<{message: string}>(`${this.api}/replicar`, { accion }).toPromise()
  }


  restoreObject(server: string): Observable<any> {
    console.log('el server es ', server)

    return this.http.post<{message: string}>(`${this.api}/restaurar`, { server })
  }

}