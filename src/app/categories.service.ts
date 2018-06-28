import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Category} from './models/Category';
import { catchError, map, tap } from 'rxjs/operators';
import {Categories} from './models/Categories';
import {Note} from './models/Note';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiUrl = 'http://localhost:8081/api/';
  private endPoint = 'categories' ;

  constructor(private http: HttpClient) { }

  /** GET categories from the server */
  getCategories (): Observable<Categories> {
      return this.http.get<Categories>(this.apiUrl + this.endPoint)
      .pipe(
        tap(categories => this.log(`fetched categories`)),
        catchError(this.handleError<Categories>('getCategories'))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getCategory(id: number): Observable<Category> {
    const url = `${this.apiUrl}${this.endPoint}/${id}`;
    return this.http.get<Category>(url).pipe(
      tap(_ => this.log(`fetched category id=${id}`)),
      catchError(this.handleError<Category>(`getCategory id=${id}`))
    );
  }


  /** POST: add a new category to the server */
  addCategory ( category: Category): Observable<Category> {
    const url = `${this.apiUrl}${this.endPoint}`;
    return this.http.post<Category>(url, category, httpOptions).pipe(
      tap((category: Category) => this.log(`added category with id=${category.id}`)),
      catchError(this.handleError<Category>('addNoteToCategory'))
    );
  }

  /** DELETE: delete the category from the server */
  deleteCategory (category: Category): Observable<Category> {
    const url = `${this.apiUrl}${this.endPoint}/${category.id}`;

    return  this.http.delete<Category>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted category id = ${category.id}`)),
      catchError(this.handleError<Category>('deleteCategory'))
    );
  }

  /** PUT: update the note on the server */
  updateCategory (category: Category): Observable<Category> {
    const url = `${this.apiUrl}${this.endPoint}/${category.id}`;

    return this.http.put(url, category, httpOptions).pipe(
      tap(_ => this.log(`updated category with id = ${category.id}`)),
      catchError(this.handleError<Note>('updateCategory'))
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
