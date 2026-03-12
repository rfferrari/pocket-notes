import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/features/note/models/note.model';
import { IonList, IonItem, IonLabel } from "@ionic/angular/standalone";
import { CommonModule, SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NoteService } from '../../services/notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  imports: [CommonModule, IonList, IonItem, IonLabel, SlicePipe, RouterLink],
})
export class NotesListComponent  implements OnInit {
  notes: Note[] = [];

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.loadNotes();
  }

  private loadNotes() {
    this.noteService.getAll().subscribe((notes) => {
      this.notes = notes;
    });
  }

}
