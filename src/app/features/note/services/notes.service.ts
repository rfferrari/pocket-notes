import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Note } from "src/app/features/note/models/note.model";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private api = 'http://localhost:3000/notes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Note[]> {
    return this.http.get<Note[]>(this.api);
  }

  getById(id: string): Observable<Note> {
    return this.http.get<Note>(`${this.api}/${id}`);
  }

  create(data: Partial<Note>): Observable<Note> {
    return this.http.post<Note>(this.api, data);
  }

  update(id: string, noteData: Partial<Note>): Observable<Note> {
    return this.http.patch<Note>(`${this.api}/${id}`, noteData);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}