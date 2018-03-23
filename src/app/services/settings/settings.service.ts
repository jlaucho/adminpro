import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {

  ajustes: Ajustes = {
    temaURL: 'assets/css/colors/defaultcss',
    tema: 'default'
  };

  constructor(  @Inject(DOCUMENT) private _document ) {
    this.cargarAjustes();
   }

  guardarAjustes () {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes () {
    if ( localStorage.getItem('ajustes') ) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTema ( this.ajustes.tema );
      console.log('Cargando del storage');
      // this.aplicarCheck( this.ajustes.temaURL );
    } else {
      this.aplicarTema ( this.ajustes.tema );
      console.log( 'Usando Valores por defecto' );
    }
  }

  aplicarTema( tema: string ) {
    let url = `assets/css/colors/${ tema }.css`;
    this._document.getElementById('tema').setAttribute( 'href', url );

    this.ajustes.tema = tema;
    this.ajustes.temaURL = url;

    this.guardarAjustes();

  }
  aplicarCheck( link: any ) {
    let selectores: any = document.getElementsByClassName('selector');
    for ( let ref of selectores ) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  colocarCheck() {
    let selectores: any = document.getElementsByClassName('selector');
    for ( let ref of selectores ) {
      if ( ref.getAttribute('data-theme') === this.ajustes.tema ){
        ref.classList.add('working');
        break;
      }
    }
  }

}

interface Ajustes {
  temaURL: string;
  tema: string;
}
