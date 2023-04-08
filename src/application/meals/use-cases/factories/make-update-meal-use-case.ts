import { KnexMealsRepository } from '@/shared/infra/database/knex/repositories/knex-meals-repository'

import { UpdateMealUseCase } from '../update-meal'

export function makeUpdateMealUseCase() {
  const mealsRepository = new KnexMealsRepository()
  const useCase = new UpdateMealUseCase(mealsRepository)

  return useCase
}
