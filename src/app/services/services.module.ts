import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedService, SidebarService, SettingsService, UsuarioService, LoginGuardsGuard } from './service.index';


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SharedService,
    SidebarService,
    SettingsService,
    UsuarioService,
    LoginGuardsGuard
  ],
  declarations: []
})
export class ServicesModule { }
