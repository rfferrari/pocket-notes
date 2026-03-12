import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInput, IonTextarea, IonButton, ToastController  } from "@ionic/angular/standalone";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoteService } from '../../services/notes.service';

@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss'],
  imports: [IonButton, IonTextarea, IonInput, ReactiveFormsModule],
})
export class NoteEditorComponent implements OnInit {
  noteForm: FormGroup = new FormGroup({
    id: new FormControl(),
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    createdAt: new FormControl(new Date()),
    updatedAt: new FormControl(new Date()),
  });

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    const noteId = this.route.snapshot.paramMap.get('id');
    if (noteId) {
      this.getNoteById(noteId);
    };
  }

  saveNote() {
    if(this.noteForm.invalid){

      return;
    }
    
    const noteData = this.noteForm.getRawValue();
    if (noteData.id) {
      this.noteService.update(noteData.id, noteData).subscribe(() => this.showSaveToast());
    } else {
      this.noteService.create(noteData).subscribe(() => this.showSaveToast());
    }
  }

  getNoteById(id: string) {
    this.noteService.getById(id).subscribe((note) => {
      this.noteForm.patchValue(note);
    });
  }

  async showSaveToast(){
    const toast = await this.toastController.create({
      message: 'Note saved successfully!',
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }
}
