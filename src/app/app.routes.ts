import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecipePageComponent } from './recipe-page/recipe-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'recipe/:id',
    component: RecipePageComponent,
  },
  { path: '**', redirectTo: '' },
];
