import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( public _ajustes: SettingsService ) { }

  ngOnInit() {
    this._ajustes.colocarCheck();
  }
cambiarValor( value: string, link: any ) {
  this._ajustes.aplicarCheck( link );
  this._ajustes.aplicarTema( value );
  }

}
