import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { IonList, IonItem, IonLabel } from "@ionic/angular/standalone";
import { CommonModule, SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  imports: [CommonModule, IonList, IonItem, IonLabel, SlicePipe, RouterLink],
})
export class NotesListComponent  implements OnInit {
  notes: Note[] = [
    {
      id: 1,
      title: 'First Note',
      content: 'This is the content of the first note.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      title: 'Second Note',
      content: 'This is the content of the second note.',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

  constructor() { }

  ngOnInit() {}

}
