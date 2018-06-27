import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { Notes } from './models/Notes';
import { Note }  from './models/Note';

import {catchError, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private apiUrl = 'http://localhost:8081/api/';
  private middlePoint = 'categories';
  private endPoint = 'notes' ;

  constructor(private http: HttpClient) { }

  /** GET notes based on Category ID */
  getNotesByCategory(category_id: number): Observable<Notes> {
    const url = `${this.apiUrl}${this.middlePoint}/${category_id}/${this.endPoint}`;

    return this.http.get<Notes>(url).pipe(
      tap(_ => this.log(`fetched notes list on category id=${category_id}`)),
      catchError(this.handleError<Notes>(`getNotesByCategory with category id=${category_id}`))
    );
  }

  /** POST: add a new note to the server */
  addNoteToCategory (category_id: number, note: Note): Observable<Note> {
    const url = `${this.apiUrl}${this.middlePoint}/${category_id}/${this.endPoint}`;
    return this.http.post<Note>(url, note, httpOptions).pipe(
      tap((note: Note) => this.log(`added note with id=${note.id}`)),
      catchError(this.handleError<Note>('addNoteToCategory'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteNoteFromCategory (category_id: number, note: Note): Observable<Note> {
    const url = `${this.apiUrl}${this.middlePoint}/${category_id}/${this.endPoint}/${note.id}`;

    return  this.http.delete<Note>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted note id = ${note.id}`)),
      catchError(this.handleError<Note>('deleteNoteFromCategory'))
    )
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
}
