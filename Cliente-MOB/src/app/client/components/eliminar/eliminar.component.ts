import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DBService } from '../../db.service';
import { ToastrService } from 'ngx-toastr';

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
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }
  
  ngOnInit(): void {
    this.buildForm()
  }

  deleteObject(): void {    
    if (this.form.valid){
      const { id } = this.form.value;

      this.loading = true;
      this.DBService.deleteObject(id)
      .then((data) => {
        this.toastr.success('Objeto eliminado exitosamente');
        this.form.reset()
      })
      .catch((err) => {
        this.toastr.error(err.error.message);
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
