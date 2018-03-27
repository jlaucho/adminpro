import { Component, OnInit } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() {
    let obs = new Observable( observar => {
      let contador = 0;
      let intervalo = setInterval( () => {
        contador += 1;
        observar.next( contador );
        if ( contador === 3 ) {
          clearInterval ( intervalo );
          observar.complete();
        }
        if ( contador === 2 ) {
          clearInterval ( intervalo );
          observar.error ( 'Auxilio' );
          // contador = 0;
        }
      }, 1000);
    });

    obs
    .retry(2)
    .subscribe(
      numero => {
      console.log( 'Numero', numero );
    },
      error => {
        console.error ('Error en la funcion', error );
      },
      () => {
        console.log('El Observador termino');
      }
    );
   }

  ngOnInit() {
  }

}
