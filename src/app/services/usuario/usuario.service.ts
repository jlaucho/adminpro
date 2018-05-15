import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from './../../models/login.models';
import { URL_SERVICIOS } from './../../config/config';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../subiArchivo/subir-archivo.service';
import { Usuario } from '../../models/usuario.model';



@Injectable()
export class UsuarioService implements OnInit{

  usuario: Usuario;
  token: string;

  constructor( public http: HttpClient,
               public router: Router,
               public subir: SubirArchivoService ) {
               this.cargarStorage();
              }
              
  ngOnInit(){
      // this.cargarStorage();          
      console.log( this.usuario );
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

   actualizarUsuario (usuario: Usuario) {
     let url = `${ URL_SERVICIOS }/usuarios/${ this.usuario._id }?token=${ this.token }`;
     return this.http.put( url, usuario )
             .map( (resp: any) => {
               this.usuarioStorage( resp.usuario._id, this.token, resp.usuario );
               Swal('Importante', 'El usuario se actualizo correctamente!', 'success');
               return true;
             });
    //  console.log( url );
   }

   cambiarImagen( file: File, id: string ) {
    this.subir.subirArchivo( file, 'usuarios', id )
        .then( (resp: any) => {
          console.log( resp );
          this.usuario.img = resp.usuario.img;
          this.usuarioStorage( id, this.token, resp.usuario );
          Swal('Actualizacion', 'La imagen se actualizo correctamente', 'success');
          return;
        })
        .catch( resp => {
          console.log('Error al intentar subir archivo', resp );
          Swal('Actualizacion', 'Error al intentar actualizar archivo', 'error');
          return;
        });
   }

   cargarUsuarios(desde: number = 0 ){
     let url = `${ URL_SERVICIOS }/usuarios?desde=${ desde }`;
     return this.http.get( url );
   }

}
