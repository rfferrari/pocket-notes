import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/features/note/models/note.model';
import { IonList, IonItem, IonLabel, IonSearchbar } from "@ionic/angular/standalone";
import { CommonModule, SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NoteService } from '../../services/notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  imports: [CommonModule, IonSearchbar, IonList, IonItem, IonLabel, SlicePipe, RouterLink],
})
export class NotesListComponent  implements OnInit {
  notes: Note[] = [];

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.loadNotes();
  }

  findNotesByTitle(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || '';
    if(query.trim() === ''){
      this.loadNotes();
      return;
    }
    this.notes = this.notes.filter(note => note.title.toLowerCase().includes(query));
  }

  private loadNotes() {
    try{
      this.noteService.getAll().then((notes) => {
        this.notes = notes;
      });
    } catch(error){
      console.error('Error loading notes:', error);
    }
  }

}
