import { Routes } from '@angular/router';

export const NOTE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/notes-list/notes-list.component').then((m) => m.NotesListComponent),
    title: 'Minhas Notas | Pocket Notes',
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/note-editor/note-editor.component').then((m) => m.NoteEditorComponent),
    title: 'Editar Nota | Pocket Notes',
  },
  {
    path: 'new',
    loadComponent: () => import('./pages/note-editor/note-editor.component').then((m) => m.NoteEditorComponent),
    title: 'Nova Nota | Pocket Notes',
  }
];
