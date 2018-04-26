import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Login } from '../models/login.models';
import Swal from 'sweetalert2';
declare function cargaPrincipal();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean;
  email: string;
  forma: FormGroup;

  constructor( private router: Router,
               private _usuarioService: UsuarioService ) { }

  ngOnInit() {
    cargaPrincipal();
    this.forma = new FormGroup({
      usuario: new FormControl( null, [Validators.required, Validators.email] ),
      password: new FormControl( null, [Validators.required] ),
      recuerdame: new FormControl( false )
    });

    this.email = localStorage.getItem('email') || '';
    if ( localStorage.getItem('email') ) {
      this.recuerdame = true;
      // this.email = localStorage.getItem('email');
    }
    
    if ( this._usuarioService.usuario.nombre.length > 1 && this._usuarioService.token.length > 15 ){
      this.router.navigate(['/dashboard']);
    }
  }

  ingresar() {
    console.log( this.forma.value );
    // return;
    if ( this.forma.invalid ) {
      Swal('Importante', 'Verifique los datos he intente de nuevo!', 'warning');
      return;
    }

    let login = new Login( this.forma.value.usuario, this.forma.value.password, this.forma.value.recuerdame  );
    this._usuarioService.login( login )
      .subscribe(( respuesta ) => {
          this.router.navigate(['/dashboard']);
        });
      }
}
