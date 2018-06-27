import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private apiUrl = 'http://localhost:8081/api/';
  private endpoint = 'notes' ;

  constructor() { }
}
