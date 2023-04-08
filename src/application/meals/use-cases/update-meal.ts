import { Meal } from '@/application/meals/entities/meal'
import { MealsRepository } from '@/application/meals/repositories/meals-repository'

import { MealNotFoundError } from './errors/meal-not-found-error'

interface UpdateMealUseCaseRequest {
  mealId: string
  userId: string
  name?: string
  description?: string
  onDiet?: boolean
  date?: Date
}

interface UpdateMealUseCaseResponse {
  meal: Meal
}

export class UpdateMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute(
    request: UpdateMealUseCaseRequest,
  ): Promise<UpdateMealUseCaseResponse> {
    const { mealId, userId, name, description, onDiet, date } = request

    const meal = await this.mealsRepository.findByIdAndUserId(mealId, userId)

    if (!meal) {
      throw new MealNotFoundError()
    }

    meal.name = name ?? meal.name
    meal.description = description ?? meal.description
    meal.date = date ?? meal.date
    meal.onDiet = typeof onDiet === 'boolean' ? onDiet : meal.onDiet

    await this.mealsRepository.save(meal)

    return { meal }
  }
}
