import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    this.contarTres().then (
      ( data ) => {
        console.log( 'Termino !!' + data );
      }
    )
    .catch(
      ( e ) => {
        console.error('Problemas con la promesa ' + e);
      }
    );
  }

  ngOnInit() {
  }

  contarTres (): Promise<boolean> {
    let contador: number = 0;
    return new Promise( (resolve, reject) => {
    let intervalo = setInterval( () => {
        contador++;
        console.log ( contador );

        if ( contador === 3 ) {
          resolve( true );
          // reject('Algun tipo de error');
          clearInterval( intervalo );
        }
       }, 1000);
    });

  }

}
