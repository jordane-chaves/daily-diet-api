import { KnexMealsRepository } from '@/shared/infra/database/knex/repositories/knex-meals-repository'

import { GetUserMetricsUseCase } from '../get-user-metrics'

export function makeGetUserMetricsUseCase() {
  const mealsRepository = new KnexMealsRepository()
  const useCase = new GetUserMetricsUseCase(mealsRepository)

  return useCase
}
