import { KnexMealsRepository } from '@/shared/infra/database/knex/repositories/knex-meals-repository'

import { DeleteMealUseCase } from '../delete-meal'

export function makeDeleteMealUseCase() {
  const mealsRepository = new KnexMealsRepository()
  const useCase = new DeleteMealUseCase(mealsRepository)

  return useCase
}
