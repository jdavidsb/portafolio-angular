import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info-pagina.interface';
//import { InfoEquipo } from '../interfaces/info-equipo.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;
  equipo: any[] = [];

  constructor( private http: HttpClient ) {
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    // Leer el archivo json
    this.http.get('assets/data/data-pagina.json') // definición de dónde esta la información
              .subscribe( (resp: InfoPagina) => {
                this.cargada = true;
                this.info = resp;
                // console.log(resp);
              } ); 
  }

  private cargarEquipo() {
    // Leer el json que devuelve la URL de firebase
    this.http.get('https://angular-html-1e195-default-rtdb.europe-west1.firebasedatabase.app/equipo.json')
              .subscribe( (resp: any) => {
                this.equipo = resp;
                //console.log(resp);
              });
  }
}
