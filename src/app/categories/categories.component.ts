import {Component, OnInit} from '@angular/core';
import {CategoriesService} from '../categories.service';
import {Category} from '../models/Category';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {


  categories: Category[];

  constructor(
    private categoryService: CategoriesService,
    // private route: ActivatedRoute,
    // private location: Location
  ) {
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories.content);
  }

  createCategory(name: string, id?: number): Category {
    const cat: Category = {
      id: id ? id : 0,
      name: name
    };
    return cat;
  }

  add(category: Category): void {
    if (category.name !== '') {
      console.log(category);
      this.categoryService.addCategory(category)
        .subscribe(category => this.categories.push(category));
    }
  }

  deleteCategory(category: Category): void {
    this.categories = this.categories.filter(c => c !== category);
    this.categoryService.deleteCategory(category).subscribe();
  }

  save(category: Category): void {
    if (category.name !== '') {
      this.categoryService.updateCategory(category).subscribe();
    }
  }

}
