import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: ProductoInterface[] = [];
  productosFiltrado: ProductoInterface[] = [];

  constructor( private http: HttpClient ) { 
    this.cartarProductos();
  }

  private cartarProductos() {
    return new Promise( (resolve, reject) =>  {
      this.http.get('https://angular-html-1e195-default-rtdb.europe-west1.firebasedatabase.app/productos_idx.json')
              .subscribe( (resp: any ) => {
                //console.log(resp);
                this.productos = resp;
                this.cargando = false;
                /* setTimeout(() => {
                  this.cargando = false;
                }, 1500); */
                resolve(this.productos);
              } );
    });
  }

  getProducto (id: string) {
    return this.http.get(`https://angular-html-1e195-default-rtdb.europe-west1.firebasedatabase.app/productos/${ id }.json`);
  }  

  buscarProducto ( txtBuscar: string ) {
    if (this.productos.length === 0){
      // Cargar productos
      this.cartarProductos().then( ()=> {
        // ejecutar este código después de tener los productos
        // aplicar filtro
        this.filtrarProductos( txtBuscar );
      });
    }else{
      // Ya podemos aplicar el filtro
      this.filtrarProductos( txtBuscar );
    }
  }

  filtrarProductos( txtBuscar: string ) {
    //console.log(this.productos);

    // Una forma de hacer el filtro
    /* this.productosFiltrado = this.productos.filter( producto => {
      return true;
    });
    console.log( this.productosFiltrado ); */

    // Antes de empezar a agregar productos al arreglo productosFiltrado, lo limpio
    this.productosFiltrado = [];

    // Hacer que no sea keysensitive
    txtBuscar = txtBuscar.toLowerCase();

    // Otra forma de hacer el filtro
    this.productos.forEach( prod => {
      // Si el txtBuscar coincide en alguna parte con la categoría del producto

      // hacer que no sea keysensitive
      const tituloLower = prod.titulo.toLowerCase();
      if ( prod.categoria.indexOf( txtBuscar ) >= 0 || tituloLower.indexOf( txtBuscar ) >= 0 ){
        // Entonces agrego el elemento al arreglo de productosFiltrado
        this.productosFiltrado.push( prod );
      }
    });
  }

}
