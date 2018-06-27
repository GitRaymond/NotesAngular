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
    private noteService: NotesService
  ) { }

  ngOnInit() {
    console.log(this.category);
    console.log('test');
    this.getNotesByCategory();
    // this.getCategory();
  }

  getNotesByCategory() {
    console.log(this.category);
    this.noteService.getNotesByCategory(this.category.id)
      .subscribe( notes => this.notes = notes.content);
  }

}
