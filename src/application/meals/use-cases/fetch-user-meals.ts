import { Meal } from '@/application/meals/entities/meal'
import { MealsRepository } from '@/application/meals/repositories/meals-repository'

interface FetchUserMealsUseCaseRequest {
  userId: string
}

interface FetchUserMealsUseCaseResponse {
  meals: Meal[]
}

export class FetchUserMealsUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute(
    request: FetchUserMealsUseCaseRequest,
  ): Promise<FetchUserMealsUseCaseResponse> {
    const { userId } = request

    const meals = await this.mealsRepository.findManyByUserId(userId)

    return { meals }
  }
}
