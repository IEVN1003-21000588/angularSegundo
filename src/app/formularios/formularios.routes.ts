import { Routes } from "@angular/router";
 
export default[
    {
        path: 'ejemplo1',
        loadComponent:()=>import('./ejemplo1/ejemplo1.component'),
    },
    {
        path: 'resistencias2',
        loadComponent:()=>import('./resistencias2/resistencias2.component'),
    },
    {
        path: 'empleados',
        loadComponent:()=>import('./empleados/empleados.component'),
    }
]