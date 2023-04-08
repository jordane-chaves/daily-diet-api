import { KnexMealsRepository } from '@/shared/infra/database/knex/repositories/knex-meals-repository'

import { FetchUserMealsUseCase } from '../fetch-user-meals'

export function makeFetchUserMealsUseCase() {
  const mealsRepository = new KnexMealsRepository()
  const useCase = new FetchUserMealsUseCase(mealsRepository)

  return useCase
}
