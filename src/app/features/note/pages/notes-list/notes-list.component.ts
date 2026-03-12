import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/features/note/models/note.model';
import { IonList, IonItem, IonLabel, IonSearchbar, IonButton, IonIcon, AlertController, IonFab, IonFabButton } from "@ionic/angular/standalone";
import { CommonModule, SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NoteService } from '../../services/notes.service';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline, add, star, starOutline } from 'ionicons/icons';


@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  imports: [IonFabButton, IonFab, IonIcon, IonButton, CommonModule, IonSearchbar, IonList, IonItem, IonLabel, SlicePipe, RouterLink],
})
export class NotesListComponent implements OnInit {
  notes: Note[] = [];

  constructor(
    private noteService: NoteService,
    private alertController: AlertController
  ) {
    addIcons({ add, star, 'star-outline': starOutline, 'create-outline': createOutline, 'trash-outline': trashOutline });
  }

  ngOnInit() {
    this.loadNotes();
  }

  findNotesByTitle(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || '';
    if (query.trim() === '') {
      this.loadNotes();
      return;
    }
    this.notes = this.notes.filter(note => note.title.toLowerCase().includes(query));
  }

  private loadNotes() {
    try {
      this.noteService.getAll().then((notes) => {
        this.notes = notes;
      });
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  }

  async deleteNote(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirm Deletion',
      subHeader: 'Are you sure you want to delete this note?',
      message: 'This action cannot be undone.',
      buttons: [
        'Cancel',
        {
          text: 'Delete',
          role: 'delete',
          cssClass: 'danger',
        }
      ],
    });

    alert.onDidDismiss().then((result) => {
      if (result.role === 'delete') {
        try {
          this.noteService.delete(id).then(() => {
            this.notes = this.notes.filter(note => note.id !== id);
          });
        } catch (error) {
          console.error('Error deleting note:', error);
        }
      }
    });

    await alert.present();
  }

  favoriteNote(id: string) {
    const note = this.notes.find(note => note.id === id);
    if (note) {
      note.isFavorite = !note.isFavorite;
      this.noteService.update(id, { isFavorite: note.isFavorite }).catch(error => {
        console.error('Error updating favorite status:', error);
      });
    }
  }

}
