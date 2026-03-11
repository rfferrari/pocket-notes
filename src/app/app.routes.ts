import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'notes',
        pathMatch: 'full',
      },
      {
        path: 'notes', 
        loadComponent: () => import('../app/pages/notes-list/notes-list.component').then((m) => m.NotesListComponent),
      },
      {
        path: 'note/:id',
        loadComponent: () => import('../app/pages/note-editor/note-editor.component').then((m) => m.NoteEditorComponent),
      },
      {
        path: 'note/new',
        loadComponent: () => import('../app/pages/note-editor/note-editor.component').then((m) => m.NoteEditorComponent),
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'notes',
  }
];
