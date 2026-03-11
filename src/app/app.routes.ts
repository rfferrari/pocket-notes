import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    title: 'Pocket Notes - Organize suas ideias',
    children: [
      {
        path: '',
        redirectTo: 'notes',
        pathMatch: 'full',
      },
      {
        path: 'notes',
        loadComponent: () => import('../app/pages/notes-list/notes-list.component').then((m) => m.NotesListComponent),
        title: 'Minhas Notas | Pocket Notes',
      },
      {
        path: 'note/:id',
        loadComponent: () => import('../app/pages/note-editor/note-editor.component').then((m) => m.NoteEditorComponent),
        title: 'Editar Nota | Pocket Notes',
      },
      {
        path: 'note/new',
        loadComponent: () => import('../app/pages/note-editor/note-editor.component').then((m) => m.NoteEditorComponent),
        title: 'Nova Nota | Pocket Notes',
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'notes',
  }
];
