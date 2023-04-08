import { Meal } from '@/application/meals/entities/meal'

export class MealViewModel {
  static toHTTP(meal: Meal) {
    return {
      id: meal.id,
      user_id: meal.userId,
      name: meal.name,
      description: meal.description,
      on_diet: meal.onDiet,
      date: meal.date,
    }
  }
}
