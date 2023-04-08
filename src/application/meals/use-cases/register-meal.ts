import { Meal } from '@/application/meals/entities/meal'
import { MealsRepository } from '@/application/meals/repositories/meals-repository'

interface RegisterMealUseCaseRequest {
  userId: string
  name: string
  description: string
  onDiet: boolean
  date: Date
}

interface RegisterMealUseCaseResponse {
  meal: Meal
}

export class RegisterMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute(
    request: RegisterMealUseCaseRequest,
  ): Promise<RegisterMealUseCaseResponse> {
    const { userId, name, description, onDiet, date } = request

    const meal = new Meal({ userId, name, description, onDiet, date })

    await this.mealsRepository.create(meal)

    return { meal }
  }
}
