import { KnexUsersRepository } from '@/shared/infra/database/knex/repositories/knex-users-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const usersRepository = new KnexUsersRepository()
  const useCase = new RegisterUseCase(usersRepository)

  return useCase
}
