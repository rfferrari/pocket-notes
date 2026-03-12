import { Injectable } from "@angular/core";
import { Note } from "src/app/features/note/models/note.model";
import { Preferences } from '@capacitor/preferences';

const NOTES_KEY = 'notes';
@Injectable({
  providedIn: 'root'
})
export class NoteService {
  constructor() {}

  async getAll(): Promise<Note[]> {
    const { value } = await Preferences.get({ key: NOTES_KEY });
    return value ? JSON.parse(value) : [];
  }

  async getByTitle(title: string): Promise<Note[]> {
    const notes = await this.getAll();
    const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(title.toLowerCase()));
    if (filteredNotes.length === 0) {
      throw new Error('No notes found with the given title');
    }
    return filteredNotes;
  }

  async getById(id: string): Promise<Note> {
    const notes = await this.getAll();
    const note = notes.find(note => note.id === id);
    if (!note) {
      throw new Error('Note not found');
    }
    return note;
  }

  async create(data: Partial<Note>): Promise<void> {
    const notes = await this.getAll();
    notes.push(data as Note);
    await Preferences.set({
      key: NOTES_KEY,
      value: JSON.stringify(notes),
    });
  }

  async update(id: string, noteData: Partial<Note>): Promise<void> {
    const notes = await this.getAll();
    const index = notes.findIndex(note => note.id === id);
    if (index !== -1) {
      notes[index] = { ...notes[index], ...noteData };
      await Preferences.set({
        key: NOTES_KEY,
        value: JSON.stringify(notes),
      });
    }
  }

  async delete(id: string): Promise<void> {
    const notes = await this.getAll();
    const updatedNotes = notes.filter(note => note.id !== id);
    await Preferences.set({
      key: NOTES_KEY,
      value: JSON.stringify(updatedNotes),
    });
  }
}