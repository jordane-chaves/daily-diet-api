import { KnexMealsRepository } from '@/shared/infra/database/knex/repositories/knex-meals-repository'

import { GetMealUseCase } from '../get-meal'

export function makeGetMealUseCase() {
  const mealsRepository = new KnexMealsRepository()
  const useCase = new GetMealUseCase(mealsRepository)

  return useCase
}
