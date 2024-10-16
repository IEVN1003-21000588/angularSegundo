import { Routes } from '@angular/router';
import {Formularios} from '@angular/forms';

export const routes: Routes = [
    {
        path:'auth',
        loadChildren:()=>import('./auth/features/auth.routes'),
    }
];

export const formularios: Formularios = [
    {
        path:'formularios',
        loadChildren:()=>import('./formularios/form.routes'),
    }
];
