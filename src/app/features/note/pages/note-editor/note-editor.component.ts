import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInput, IonTextarea, IonButton, ToastController, IonIcon, IonCol, IonRow } from "@ionic/angular/standalone";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoteService } from '../../services/notes.service';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { star, starOutline } from 'ionicons/icons';

@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss'],
  imports: [CommonModule, IonIcon, IonButton, IonTextarea, IonInput, ReactiveFormsModule, IonCol, IonRow],
})
export class NoteEditorComponent implements OnInit {
  noteForm: FormGroup = new FormGroup({
    id: new FormControl(),
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    isFavorite: new FormControl(),
    createdAt: new FormControl(),
    updatedAt: new FormControl(),
  });

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private toastController: ToastController
  ) {
    addIcons({ star, 'star-outline': starOutline });
  }

  ngOnInit() {
    const noteId = this.route.snapshot.paramMap.get('id');
    if (noteId) {
      this.getNoteById(noteId);
    };
  }

  saveNote() {
    if (this.noteForm.invalid) {

      return;
    }

    try {
      const noteData = this.noteForm.getRawValue();
      if (noteData.id) {
        noteData.updatedAt = new Date();
        this.noteService.update(noteData.id, noteData).then(() => this.showSaveToast());
      } else {
        noteData.id = crypto.randomUUID();
        noteData.createdAt = new Date();
        noteData.updatedAt = new Date();
        this.noteService.create(noteData).then(() => this.showSaveToast());
      }
    } catch (error) {
      console.error('Error saving note:', error);
      this.showErrorToast();
    }
  }

  getNoteById(id: string) {
    try {
      this.noteService.getById(id).then((note) => {
        this.noteForm.patchValue(note);
      });
    } catch (error) {
      console.error('Error fetching note:', error);
    }
  }

  favoriteNote() {
    const currentNote = this.noteForm.getRawValue();
    currentNote.isFavorite = !currentNote.isFavorite;
    this.noteForm.patchValue(currentNote);
  }

  get favoriteIcon() {
    return this.noteForm.get('isFavorite')?.value ? 'star' : 'star-outline';
  }

  private async showSaveToast() {
    const toast = await this.toastController.create({
      message: 'Note saved successfully!',
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }

  private async showErrorToast() {
    const toast = await this.toastController.create({
      message: 'An error occurred while saving the note.',
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }
}
