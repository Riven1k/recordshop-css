import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { roleGuard } from './core/guards/role-guard';


export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'records', loadComponent: () => import('./features/records-list/records-list').then(m => m.RecordsListComponent)},
    {path: 'records/update/:id',
        loadComponent: () => import('./features/records-update/records-update').then(m => m.RecordsUpdateComponent),
        canActivate: [roleGuard],
        data: {roles: ['manager', 'admin']}},
    {path: 'records/add',
        loadComponent: () => import('./features/records-add/records-add').then(m => m.RecordsAddComponent)
    },
    {path: 'records/view/:id',
        loadComponent: () => import('./features/records-view/records-view').then(m => m.RecordsViewComponent)
    }
];
