import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from './../../models/usuario.model';
import { Login } from './../../models/login.models';
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

   login( login: Login) {
     let url = `${ URL_SERVICIOS }/login`;
     return this.http.post( url, login );
   }

}
