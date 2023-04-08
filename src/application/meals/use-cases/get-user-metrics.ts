import { MealsRepository } from '@/application/meals/repositories/meals-repository'

interface GetUserMetricsUseCaseRequest {
  userId: string
}

interface GetUserMetricsUseCaseResponse {
  mealsCount: number
  mealsWithinDietCount: number
  mealsOffDietCount: number
  bestSequenceWithinDietCount: number
}

export class GetUserMetricsUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute(
    request: GetUserMetricsUseCaseRequest,
  ): Promise<GetUserMetricsUseCaseResponse> {
    const { userId } = request

    const meals = await this.mealsRepository.findManyByUserId(userId)

    const mealsCount = meals.length

    const mealsWithinDietCount = meals.filter(
      (meal) => meal.onDiet === true,
    ).length

    const mealsOffDietCount = meals.filter(
      (meal) => meal.onDiet === false,
    ).length

    const bestSequenceWithinDietCount = meals
      .map((meal) => (meal.onDiet ? '1' : '0'))
      .join('')
      .split('0')
      .reduce((result, current) => {
        const amountDietSequence = current.length
        return amountDietSequence > result ? amountDietSequence : result
      }, 0)

    return {
      mealsCount,
      mealsWithinDietCount,
      mealsOffDietCount,
      bestSequenceWithinDietCount,
    }
  }
}
