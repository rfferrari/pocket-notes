import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Note } from "src/app/features/note/models/note.model";

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private api = 'http://localhost:3000/notes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Note[]> {
    return this.http.get<Note[]>(this.api);
  }

  getAllByStatus(status: string): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.api}?status=${status}`);
  }

  create(data: Partial<Note>): Observable<Note> {
    return this.http.post<Note>(this.api, data);
  }

  updateStatus(id: number, status: string): Observable<Note> {
    return this.http.patch<Note>(`${this.api}/${id}`, { status });
  }
}