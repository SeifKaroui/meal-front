import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe';
import { PaginatedResponse } from '../models/paginated-response';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private apiUrl = environment.apiUrl + '/recipes';

  constructor(private http: HttpClient) {}

  public LIMIT: number = 12;
  // Method to get all recipes
  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}`);
  }

  // Method to get a single recipe by its ID
  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
  }

  // Method to search recipes by name with pagination
  searchByName(
    name: string,
    page: number = 1,
    limit: number = this.LIMIT,
  ): Observable<PaginatedResponse> {
    let params = new HttpParams()
      .set('name', name)
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<PaginatedResponse>(`${this.apiUrl}/search`, {
      params,
    });
  }
}
