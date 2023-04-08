import { MealsRepository } from '@/application/meals/repositories/meals-repository'

import { MealNotFoundError } from './errors/meal-not-found-error'

interface DeleteMealUseCaseRequest {
  mealId: string
  userId: string
}

type DeleteMealUseCaseResponse = void

export class DeleteMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute(
    request: DeleteMealUseCaseRequest,
  ): Promise<DeleteMealUseCaseResponse> {
    const { mealId, userId } = request

    const meal = await this.mealsRepository.findByIdAndUserId(mealId, userId)

    if (!meal) {
      throw new MealNotFoundError()
    }

    await this.mealsRepository.delete(meal.id)
  }
}
