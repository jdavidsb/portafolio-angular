import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfoPaginaService } from '../../services/info-pagina.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( public infoPaginaService: InfoPaginaService,
              private router: Router ) { }

  ngOnInit(): void {
  }

  buscarProducto(txtBuscar: string) {
    // Comprobación de que el txtBuscar contiene algo, si no contiene nada, return
    if (txtBuscar.length < 1){
      return;
    }
    this.router.navigate(['/search', txtBuscar]);
    //console.log(txtBuscar);
  }

}
