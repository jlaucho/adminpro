import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';
import { callLifecycleHooksChildrenFirst } from '@angular/core/src/view/provider';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;

  constructor(
        private _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }

  guardar ( usuario: Usuario ) {
    this.usuario.nombre = usuario.nombre;
    // Se verifica que el usuario no venga de google
    if ( !this.usuario.google ) {
      this.usuario.email = usuario.email;
    }

    this._usuarioService.actualizarUsuario( this.usuario )
         .subscribe();
  }

  seleccionImagen( archivo ) {
    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }
    if ( archivo.type.indexOf('image') < 0 ) {
      console.log('Archivo no permitido');
      Swal('Archivo No permitido', 'Debe seleccionar un arcivo de imagen valido', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let imgTempUrl = reader.readAsDataURL( archivo );

    reader.onloadend = () => {
      this.imagenTemp = reader.result;
    };
    // console.log( archivo );
  }

  cambiarImagen() {
    this._usuarioService.cambiarImagen( this.imagenSubir, this._usuarioService.usuario._id );
  }

}
