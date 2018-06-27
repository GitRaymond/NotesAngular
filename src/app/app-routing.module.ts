import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import {CategoryDetailComponent} from './category-detail/category-detail.component';


const routes: Routes = [
  { path: 'categories', component: CategoriesComponent },

  { path: 'categories/:id', component: CategoryDetailComponent },
];


@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
