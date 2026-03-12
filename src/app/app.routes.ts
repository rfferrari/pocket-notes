import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layouts/layout/layout.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'notes' },
  {
    path: '',
    component: LayoutComponent,
    title: 'Pocket Notes - Organize suas ideias',
    children: [
      {
        path: 'notes',
        loadChildren: () => import('./features/note/note.routes').then(m => m.NOTE_ROUTES)
      }
    ]
  },
];
