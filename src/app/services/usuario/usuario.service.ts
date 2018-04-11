import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from './../../models/usuario.model';
import { URL_SERVICIOS } from './../../config/config';



@Injectable()
export class UsuarioService {

  constructor( private http: HttpClient ) {
    console.log('Servicio de usuario Listo');
   }

   crearUsuario( usuario: Usuario ) {
     let url = `${ URL_SERVICIOS }/usuarios`;
     return this.http.post( url, usuario );
   }

}
