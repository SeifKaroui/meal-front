import { Component, OnInit } from '@angular/core';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  imports: [RecipeCardComponent, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  recipes: Recipe[] = [];
  isLoading: boolean = false; // Loading state
  errorMessage: string | null = null; // Error message for error handling
  isSearching: boolean = false;
  currentPage: number = 1;
  total: number = 1;
  totalPages: number = 6;
  searchedName: string = '';

  constructor(
    private recipeService: RecipeService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.loadRecipes(); // Load recipes when component initializes
  }

  loadRecipes(): void {
    this.isLoading = true; // Set loading state to true when the API call starts
    this.errorMessage = null; // Reset any previous error message

    this.recipeService.getAllRecipes().subscribe({
      next: (response) => {
        this.recipes = response; // Assign the recipes from the response
        this.isLoading = false; // Set loading state to false once data is fetched
      },
      error: (error) => {
        console.error('Error fetching recipes:', error);
        this.toastr.error('Error fetching recipes.');
        this.errorMessage = 'Failed to load recipes. Please try again later.'; // Handle errors
        this.isLoading = false; // Set loading state to false in case of error
      },
    });
  }

  search(name: string, page: number) {
    this.isLoading = true;
    this.errorMessage = null;
    this.isSearching = true;
    this.currentPage = page;
    this.searchedName = name;

    this.recipeService.searchByName(name, page).subscribe({
      next: (response) => {
        this.recipes = response.data;
        this.total = response.total;
        this.totalPages = Math.ceil(response.total / this.recipeService.LIMIT);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching recipes:', error);
        this.toastr.error('Error searching for recipes.');
        this.errorMessage = 'Failed to load recipes. Please try again later.';
        this.isLoading = false;
      },
    });
  }
  searchNext() {
    this.search(this.searchedName, this.currentPage + 1);
  }

  searchPrev() {
    this.search(this.searchedName, this.currentPage - 1);
  }

  clearSearch() {
    this.isSearching = false;
    this.searchedName = '';
    this.loadRecipes();
  }
  range(end: number, step = 1) {
    const res = [];
    for (let i = 1; i <= end; i++) {
      res.push(i);
    }
    return res;
  }
}
