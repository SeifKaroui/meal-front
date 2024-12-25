import { Ingredient } from './ingredient';

export interface Recipe {
  id: number;
  name: string;
  category: string;
  instructions: string;
  image: string | null;
  tags: string | null;
  ingredients: Ingredient[]; // Add the list of ingredients
}
