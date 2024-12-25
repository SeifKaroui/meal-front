import { Component, Input } from '@angular/core';
import { Recipe } from '../models/recipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-card',
  imports: [],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css',
})
export class RecipeCardComponent {
  @Input({ required: true }) recipe!: Recipe;

  constructor(private router: Router) {}

  viewRecipe() {
    this.router.navigate(['/recipe', this.recipe.id], {
      state: { recipe: this.recipe },
    });
  }
}
