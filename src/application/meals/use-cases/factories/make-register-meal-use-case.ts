import { KnexMealsRepository } from '@/shared/infra/database/knex/repositories/knex-meals-repository'

import { RegisterMealUseCase } from '../register-meal'

export function makeRegisterMealUseCase() {
  const mealsRepository = new KnexMealsRepository()
  const useCase = new RegisterMealUseCase(mealsRepository)

  return useCase
}
