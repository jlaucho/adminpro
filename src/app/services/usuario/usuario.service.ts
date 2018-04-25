import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from './../../models/usuario.model';
import { Login } from './../../models/login.models';
import { URL_SERVICIOS } from './../../config/config';
import { Router } from '@angular/router';



@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor( private http: HttpClient,
               private router: Router ) {
                this.cargarStorage();
   }

   cargarStorage() {
    this.usuario = JSON.parse(localStorage.getItem('usuario')) || '';
    this.token = localStorage.getItem('token') || '';
   }

   logOut() {
     localStorage.removeItem('token');
     localStorage.removeItem('usuario');
     localStorage.removeItem('id');

      this.router.navigate(['/login']);
   }

   usuarioStorage( id: string, token: string, usuario: Usuario ) {
    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'usuario', JSON.stringify(usuario));

    return true;
   }

   crearUsuario( usuario: Usuario ) {
     let url = `${ URL_SERVICIOS }/usuarios`;
     return this.http.post( url, usuario );
   }

   login( login: Login) {

    if ( login.recuerdame ) {
      localStorage.setItem( 'email', login.email );
    } else {
      localStorage.removeItem('email');
    }

     let url = `${ URL_SERVICIOS }/login`;
     return this.http.post( url, login )
             .map( (respuesta: any) => {
               this.usuarioStorage( respuesta.id, respuesta.token, respuesta.usuario );
               return true;
             });
   }

}
