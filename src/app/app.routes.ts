import { Routes } from '@angular/router';



export const routes: Routes = [
    /* {path:'',component:InicioComponent},
    {path:'inicio',component:InicioComponent},
    {path:'subSerie/:id',component:SubSerieComponent}, */
    {
        path: '',
        loadComponent: () => import('../Shared/Components/layout/layout.component'),
        children: [
            {
                path: 'inicio',
                loadComponent: () => import('./Pages/inicio/inicio.component')
            },
            {
                path: 'subSerie',
                loadComponent: () => import('./Pages/dialog-subserie/dialog-subSerie.component')
            },
            {
                 path: 'serie',
                loadComponent: () => import('./Pages/Serie/serie.component') 
            },
            {
                path: 'sub-Serie',
               loadComponent: () => import('./Pages/sub-serie/sub-serie.component') 
           },
            {
                path: 'subSerie/:id',
                loadComponent: () => import('./Pages/dialog-subserie/dialog-subSerie.component')
                


            },

            {
                path: '',
                redirectTo: 'inicio',
                pathMatch: 'full'
            }
    
        ]
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];


 