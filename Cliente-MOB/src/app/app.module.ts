import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { ClientComponent } from './client/client.component';
import { CrearComponent } from './client/components/crear/crear.component';
import { EliminarComponent } from './client/components/eliminar/eliminar.component';
import { ConsultarComponent } from './client/components/consultar/consultar.component';
import { ReplicarRestaurarComponent } from './client/components/replicar-restaurar/replicar-restaurar.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    CrearComponent,
    EliminarComponent,
    ConsultarComponent,
    ReplicarRestaurarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
