import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInput, IonTextarea, IonButton, ToastController, IonIcon, IonCol, IonRow, IonFooter, IonLabel, AlertController } from "@ionic/angular/standalone";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoteService } from '../../services/notes.service';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { star, starOutline } from 'ionicons/icons';

@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss'],
  imports: [IonFooter, CommonModule, IonIcon, IonButton, IonTextarea, IonInput, ReactiveFormsModule, IonCol, IonRow, IonLabel],
})
export class NoteEditorComponent implements OnInit {
  noteForm: FormGroup = new FormGroup({
    id: new FormControl(),
    title: new FormControl('', [Validators.required]),
    content: new FormControl(''),
    isFavorite: new FormControl(),
    createdAt: new FormControl(),
    updatedAt: new FormControl(),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private noteService: NoteService,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    addIcons({ star, 'star-outline': starOutline });
  }

  ngOnInit() {
    const noteId = this.activatedRoute.snapshot.paramMap.get('id');
    if (noteId) {
      this.getNoteById(noteId);
    };
  }

  async saveNote() {
    if (this.noteForm.invalid) {
      const toast = await this.toastController.create({
        message: 'Please fill in the title field.',
        duration: 1500,
        position: 'bottom',
      });

      await toast.present();
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
      this.router.navigate(['/notes']);
    } catch (error) {
      console.error('Error saving note:', error);
      this.showErrorToast();
    }
  }

  async cancel() {
    if (this.noteForm.dirty) {
      const alert = await this.alertController.create({
        header: 'Exit without save',
        subHeader: 'Are you sure you want to exit without save the note?',
        buttons: [
          'Cancel',
          {
            text: 'Ok',
            role: 'ok',
            cssClass: 'danger',
          }
        ],
      });
      alert.onDidDismiss().then((result) => {
        if (result.role === 'ok') {
          this.router.navigate(['/notes']);
        }
      })
      await alert.present();
    } else {
      this.router.navigate(['/notes']);
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
