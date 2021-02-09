import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DBService } from '../../db.service';

@Component({
  selector: 'app-replicar-restaurar',
  templateUrl: './replicar-restaurar.component.html',
  styleUrls: ['./replicar-restaurar.component.scss']
})
export class ReplicarRestaurarComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  dropdownLabel: string;
  actionToMake = 'Replica';
  actionOptios = ['Replica', 'Restauración']
  dropdownOptions ={
    'Replica': {
      content: ['COMMIT', 'ABORT'],
      label: 'Elige la acción a realizar'
    },
    'Restauración': {
      content: ['RESTAURAR-A', 'RESTAURAR-B'],
      label: 'Elige el servidor para restaurar'
    }
  }

  dropdownActualDropdowns = [];
  
  constructor(
    public DBService: DBService,
    private formBuilder: FormBuilder
  ) { }
  
  makeAction(): void {
    const {feature, dropdownContent} = this.form.value;
    this.loading = true;

    if (feature == 'Replicar') this.replicar(dropdownContent);
    else this.restaurar(dropdownContent);
  }

  ngOnInit(): void {
    this.buildForm();
    this.form.get('feature').valueChanges.subscribe((value) => {
        const {content, label } = this.dropdownOptions[value];
        this.actionToMake = value;
        this.setDropDownOptions(content, label);
    })
  }
  

  private setDropDownOptions(options: string[], label: string): void {
    this.dropdownActualDropdowns = options;
    this.dropdownLabel = label;
    this.form.get('dropdownContent').setValue(options[0]);
  }

  private buildForm():void {
    const { content, label } = this.dropdownOptions.Replica;
    this.form  = this.formBuilder.group({
      feature: [null, Validators.required],
      dropdownContent: [this.dropdownOptions.Replica.content[0]]
    })


    this.setDropDownOptions(content, label);
  }

  replicar(action: string): void{
    this.DBService.replicateObject(action)
    .then(() => {
      console.log('Objeto replicado exitosamente')
    })
    .catch((err) => {
      console.log('Error es:' + err)
    })
    .finally(() => this.loading = false)
  }

  restaurar(server: string): void {
    this.DBService.restoreObject(server)
    .then(() => {
      console.log('Objeto restaurado exitosamente')
    })
    .catch((err) => {
      console.log('Error es:' + err)
    })
    .finally(() => this.loading = false)
  }
}
