import { Component, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {
    this.subscription = this.regresaObservable()
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
        // if ( contador === 3 ) {
        //   clearInterval ( intervalo );
        //   observar.complete();
        // }
        // if ( contador === 2 ) {
        //   observar.error ( 'Auxilio' );
        //   // contador = 0;
        // }
      }, 500);
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
