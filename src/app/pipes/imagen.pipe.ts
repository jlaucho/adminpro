import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuarios'): any {
    let url = `${ URL_SERVICIOS }/img/`;
    if ( !img ) {
      return `${ url }/${ tipo }/default`;
    }

    if ( img.indexOf('https') > 0 ) {
      return img;
    }
    return `${ url }/${ tipo }/${ img }`;
    // let imagen = '';

    // switch ( tipo ) {
    //   case 'usuarios':

    //     break;
    //     case 'hospitales':

    //     break;
    //     case 'medicos':

    //     break;

    //   default:
    //     imagen = `${ url }/${ tipo }/default`;
    //     break;
    // }

  }

}
