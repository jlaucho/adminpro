import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  
  constructor( private _usuarioService: UsuarioService ) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this._usuarioService.cargarUsuarios( this.desde )
        .subscribe( (respuesta: any) =>{
          console.log( respuesta.usuarios );
          this.usuarios = respuesta.usuarios;
          this.totalRegistros = respuesta.total;
        });
  }

}
