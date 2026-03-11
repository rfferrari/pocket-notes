import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInput, IonTextarea, IonButton } from "@ionic/angular/standalone";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss'],
  imports: [IonButton, IonTextarea, IonInput, ReactiveFormsModule],
})
export class NoteEditorComponent implements OnInit {
  noteForm: FormGroup = new FormGroup({
    id: new FormControl(),
    title: new FormControl(''),
    content: new FormControl(''),
    createdAt: new FormControl(new Date()),
    updatedAt: new FormControl(new Date()),
  });

  constructor(
    private route: ActivatedRoute,
  ) {
    const noteId = this.route.snapshot.paramMap.get('id');
    if (noteId) {
      this.noteForm.patchValue({
        id: parseInt(noteId, 10),
        title: `Note ${noteId}`,
        content: `This is the content of note ${noteId}.`,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      this.noteForm.updateValueAndValidity();
    };
  }

  ngOnInit() { }

  saveNote() {
    throw new Error('Method not implemented.');
  }
}
