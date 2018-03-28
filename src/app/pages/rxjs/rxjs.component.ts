import { Component, OnInit } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
<<<<<<< HEAD
// import { setInterval } from 'timers';
// import 'rxjs/add/operator/retry';
=======
>>>>>>> b3680d99374c1f67d42c9c67a44c9c515de7b658

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() {
<<<<<<< HEAD
    this.regresaObservable()
=======
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
>>>>>>> b3680d99374c1f67d42c9c67a44c9c515de7b658
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

  regresaObservable(): Observable<any> {
    return new Observable( observar => {
      let contador = 0;
      let intervalo = setInterval( () => {
        contador += 1;
        let salida = {
          valor: contador
        };
        observar.next( salida );
        if ( contador === 3 ) {
          clearInterval ( intervalo );
          observar.complete();
        }
        // if ( contador === 2 ) {
        //   observar.error ( 'Auxilio' );
        //   // contador = 0;
        // }
      }, 1000);
    })
    .retry(2)
    .map( (resp: any) => {
      return resp.valor;
    })
    .filter( (valor, index) => {
      // console.log( 'Fliter', valor, index );
      if ( (valor % 2) === 0 ) {
        // numeros pares
        return false;
      } else {
        // numeros impares
        return true;
      }
    });
  }

}
