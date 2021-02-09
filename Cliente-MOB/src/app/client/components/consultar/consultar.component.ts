import { Component, OnInit } from '@angular/core';
import { DBService } from '../../db.service';

interface objeto {
  id: number;
  nombre: string;
  fecha: string;
  accion: string;
} 


@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.scss']
})
export class ConsultarComponent implements OnInit {

  objetos: objeto[]= [];

  constructor(public DBService: DBService) { }

  ngOnInit(): void {
    this.getObjects();
  }

  getObjects(): void {
    this.DBService.getObjects().subscribe(data => {
      this.objetos = [];
      data.Objetos.Objeto.map((el)=>{
        this.objetos.push({
          id: el.id._text, 
          nombre: el.Nombre._text, 
          fecha: el.Fecha._text, 
          accion: el.Accion._text
        })
      })
    });
  }
}
