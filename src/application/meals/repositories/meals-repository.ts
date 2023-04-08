import { Meal } from '../entities/meal'

export interface MealsRepository {
  findById(id: string): Promise<Meal | null>
  findByIdAndUserId(id: string, userId: string): Promise<Meal | null>
  findManyByUserId(userId: string): Promise<Meal[]>
  delete(id: string): Promise<void>
  create(meal: Meal): Promise<void>
  save(meal: Meal): Promise<void>
}
