import { Routes } from '@angular/router';

const loadDesigns = () =>
  import('./pages/designs.component').then((module) => module.DesignsComponent);
const loadDesigners = () =>
  import('./pages/designers.component').then(
    (module) => module.DesignersComponent,
  );
const loadContact = () =>
  import('./pages/contact.component').then((module) => module.ContactComponent);

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home.component').then(
            (module) => module.HomeComponent,
          ),
      },
      {
        path: 'designers',
        loadComponent: loadDesigners,
      },
      {
        path: 'designers/:id',
        loadComponent: () =>
          import('./pages/designer-details.component').then(
            (module) => module.DesignerDetailsComponent,
          ),
      },
      {
        path: 'designs',
        loadComponent: loadDesigns,
      },
      {
        path: 'designs/:category',
        loadComponent: loadDesigns,
      },
      {
        path: 'contact',
        loadComponent: loadContact,
      },
      {
        path: 'contact/:designerId',
        loadComponent: loadContact,
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./pages/about.component').then(
            (module) => module.AboutComponent,
          ),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
