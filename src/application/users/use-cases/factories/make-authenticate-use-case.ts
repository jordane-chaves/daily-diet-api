import { KnexUsersRepository } from '@/shared/infra/database/knex/repositories/knex-users-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const usersRepository = new KnexUsersRepository()
  const useCase = new AuthenticateUseCase(usersRepository)

  return useCase
}
