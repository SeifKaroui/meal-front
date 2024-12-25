import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../models/recipe';
import { TagsComponent } from '../tags/tags.component';
import { CommonModule } from '@angular/common';
import { Ingredient } from '../models/ingredient';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.css'],
  imports: [TagsComponent, CommonModule],
})
export class RecipePageComponent implements OnInit {
  recipe: Recipe | null = null;
  ingredients: Ingredient[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
  ) {}

  goToHome() {
    this.router.navigate([''], {});
  }

  ngOnInit(): void {
    // Get the recipe ID from the route
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.recipeService.getRecipeById(+id).subscribe({
        next: (data) => {
          this.recipe = data;
          this.ingredients = this.recipe.ingredients;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading recipe:', error);
          this.errorMessage = 'Failed to load recipe. Please try again later.';
          this.isLoading = false;
        },
      });
    } else {
      this.errorMessage = 'Invalid recipe ID.';
      this.isLoading = false;
    }
  }
}
