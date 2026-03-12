import { Routes } from '@angular/router';

export const NOTE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/notes-list/notes-list.component').then((m) => m.NotesListComponent),
    title: 'Notes | Pocket Notes',
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./pages/note-editor/note-editor.component').then((m) => m.NoteEditorComponent),
    title: 'Edit | Pocket Notes',
  },
  {
    path: 'create',
    loadComponent: () => import('./pages/note-editor/note-editor.component').then((m) => m.NoteEditorComponent),
    title: 'New | Pocket Notes',
  }
];
