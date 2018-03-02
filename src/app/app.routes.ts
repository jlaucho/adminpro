import { Routes, RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';

import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { NopagefoundComponent } from './shaded/nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';


const appRoute: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'grafica1', component: Graficas1Component },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
   },
   { path: 'login', component: LoginComponent },
   { path: 'register', component: RegisterComponent },
  { path: '**', component: NopagefoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot( appRoute, { useHash: true } );
