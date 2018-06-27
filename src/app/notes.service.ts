import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Notes} from './models/notes'
import {Categories} from './models/Categories';
import {catchError, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private apiUrl = 'http://localhost:8081/api/';
  private middlePoint = 'categories';
  private endPoint = 'notes' ;

  constructor(private http: HttpClient) { }

  /** GET notes based on Category ID */
  getNotesByCategory(id: number): Observable<Notes> {
    const url = `${this.apiUrl}${this.middlePoint}/${id}/${this.endPoint}`;

    return this.http.get<Notes>(url).pipe(
      tap(_ => this.log(`fetched notes list on category id=${id}`)),
      catchError(this.handleError<Notes>(`getNotesByCategory with category id=${id}`))
    );
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
