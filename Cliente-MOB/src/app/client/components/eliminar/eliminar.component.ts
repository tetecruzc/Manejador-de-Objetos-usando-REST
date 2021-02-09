import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DBService } from '../../db.service';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.scss']
})
export class EliminarComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  
  constructor(
    public DBService: DBService,
    private formBuilder: FormBuilder
  ) { }
  
  ngOnInit(): void {
    this.buildForm()
  }

  deleteObject(): void {    
    if (this.form.valid){
      const { id } = this.form.value;

      this.loading = true;
      this.DBService.deleteObject(id)
      .then(() => {
        console.log("Objeto eliminado");
        this.form.setValue({id: null});
      })
      .catch(() => {
        console.log("Ocurrio un error");
      })
      .finally(() => this.loading = false)
    }
  }

  buildForm():void {
    this.form  = this.formBuilder.group({
      id: [null, Validators.required]
    })
  }
}
