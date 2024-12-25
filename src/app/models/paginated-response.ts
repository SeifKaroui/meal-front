import { Recipe } from './recipe';

export interface PaginatedResponse {
  data: Recipe[];
  total: number;
  page: number;
  limit: number;
}
