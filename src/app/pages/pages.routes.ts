

import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardsGuard } from '../services/guards/login-guards.guard';
import { ProfileComponent } from './profile/profile.component';



const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardsGuard ],
        children: [
          { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
          { path: 'progress', component: ProgressComponent, canActivate: [ LoginGuardsGuard ] , data: { titulo: 'Progreso' } },
          { path: 'profile', component: ProfileComponent, canActivate: [ LoginGuardsGuard ] , data: { titulo: 'Mi perfil' } },
          { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
          { path: 'grafica1', component: Graficas1Component, data: { titulo: 'Graficas' } },
          { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Observables' } },
          { path: 'account-setting', component: AccountSettingsComponent, data: { titulo: 'Ajustes' } },
          { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
