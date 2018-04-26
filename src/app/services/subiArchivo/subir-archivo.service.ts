import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class SubirArchivoService {

  constructor() { }

  subirArchivo( archivo: File, tipo: string, id: string ) {
    let formData = new FormData();
    let xhr = new XMLHttpRequest();

    formData.append( 'img', archivo, archivo.name );

    return new Promise(( resolve, reject ) => {

      xhr.onreadystatechange = () => {
        if ( xhr.readyState === 4 ) {
          if ( xhr.status === 200 ) {
            console.log( 'Subio' );
            resolve( JSON.parse(xhr.response) );
          } else {
            console.error('Fallo la subida');
            reject( xhr.response );
          }
        }
      };
      let url = `${ URL_SERVICIOS }/upload/${ tipo }/${ id }`;
      xhr.open('PUT', url, true);
      xhr.send( formData );
    });
  }
}

