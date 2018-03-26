import { Routes, RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopagefoundComponent } from './shaded/nopagefound/nopagefound.component';


const appRoute: Routes = [
   { path: 'login', component: LoginComponent },
   { path: 'register', component: RegisterComponent },
  { path: '**', component: NopagefoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot( appRoute, { useHash: true } );
