///<reference path="../notes.service.ts"/>
import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../models/Note';
import { NotesService } from '../notes.service';
import {Category} from '../models/Category';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  @Input() category: Category;


  notes: Note[];

  constructor(
    private notesService: NotesService
  ) { }

  ngOnInit() {
    this.getNotesByCategory();
  }

  getNotesByCategory(): void {
    this.notesService.getNotesByCategory(this.category.id)
      .subscribe( notes => this.notes = notes.content);
  }

  createNote(title: string, content: string): Note {
    const note: Note = {
                id: 0,
            title: title,
            content: content
    }
    return note;
  }

  deleteNoteFromCategory(note: Note) {
    this.notes = this.notes.filter(n => n !== note);
    this.notesService.deleteNoteFromCategory(this.category.id, note)
      .subscribe();
  }

  addNoteToCategory(note: Note): void {

    // TODO: guard for wrong input
    this.notesService.addNoteToCategory(this.category.id, note)
      .subscribe( note => this.notes.push(note));
  }

}
