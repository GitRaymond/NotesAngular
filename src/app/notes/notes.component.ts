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

  createNote(title: String, content: String): Note {
    const note = { title: title,
            content: content}
    return note;
  }

  addNoteToCategory(note: Note): void {

    // TODO: guard for wrong input
    this.notesService.addNoteToCategory(this.category.id, note)
      .subscribe( note => this.notes.push(note));
  }

}
