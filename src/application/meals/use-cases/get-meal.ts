import { Meal } from '@/application/meals/entities/meal'
import { MealsRepository } from '@/application/meals/repositories/meals-repository'
import { MealNotFoundError } from './errors/meal-not-found-error'

interface GetMealUseCaseRequest {
  mealId: string
  userId: string
}

interface GetMealUseCaseResponse {
  meal: Meal
}

export class GetMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute(
    request: GetMealUseCaseRequest,
  ): Promise<GetMealUseCaseResponse> {
    const { mealId, userId } = request

    const meal = await this.mealsRepository.findByIdAndUserId(mealId, userId)

    if (!meal) {
      throw new MealNotFoundError()
    }

    return { meal }
  }
}
