import { Component, OnInit } from '@angular/core';
// import { Usuario } from './../models/usuario.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

// import { HttpClient } from '@angular/common/http';

declare function cargaPrincipal();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor( private _usuario: UsuarioService,
               private router: Router ) { }

  ngOnInit() {
    cargaPrincipal();

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl( null, [Validators.required, Validators.email] ),
      password: new FormControl( null, Validators.required ),
      password2: new FormControl( null, Validators.required ),
      condiciones: new FormControl( false )
    }, {validators: this.sonIguales( 'password', 'password2' ) });

    // this.forma.setValue({
    //   nombre: 'Jesus Laucho',
    //   email: 'jlaucho@gmail.com',
    //   password: '123456',
    //   password2: '123456',
    //   condiciones: true
    // });
  }

  sonIguales( campo1: string, campo2: string ) {
    return ( group: FormGroup ) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if ( pass1 === pass2 ) {
        return null;
      }
      return {
        sonIguales: true
      };
    };
  }

  registrarUsuario() {
    if ( this.forma.invalid ) {
      console.log('Forma invalida');
      return;
    }
    if ( !this.forma.value.condiciones ) {
      console.log('Debe de aceptar las condiciones');
      Swal('Importante', 'Debe aceptar las condiciones!', 'warning');
      return;
    }
    let usuario = new Usuario( this.forma.value.nombre, this.forma.value.email, this.forma.value.password  );
    this._usuario.crearUsuario( usuario )
      .subscribe(( resp: any ) => {
        if ( resp.ok ) {
          console.log( resp );
          this.router.navigate(['/login']);
          Swal('Importante', 'El usuario: ' + resp.usuario.email + ' ha sido creado correctamente!', 'success');
        }
      });
    console.log('Forma Valida');
  }

}
