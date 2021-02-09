import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DBService } from '../../db.service';
@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {
  createForm: FormGroup;


  constructor(private formBuilder: FormBuilder, public DBService: DBService) {
    this.buildForm();
   }

  ngOnInit(): void {
  }

  
  private buildForm(): void {
    this.createForm = this.formBuilder.group({
      nombre: ['', Validators.compose([Validators.required])],
      fecha: ['', Validators.compose([Validators.required])],
      accion: ['', Validators.compose([Validators.required])],
    });
  }

  createObject(): void {
    this.DBService.createObject(this.createForm.value).subscribe(data=>{
      console.log(data);
    })
  }
}
