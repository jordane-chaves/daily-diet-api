import { User } from '@/application/users/entities/user'
import { UsersRepository } from '@/application/users/repositories/users-repository'

import { KnexUserMapper } from '../mappers/knex-user-mapper'
import { knex } from '..'

export class KnexUsersRepository implements UsersRepository {
  async findByEmail(email: string) {
    const user = await knex('users').where({ email }).first()

    if (!user) {
      return null
    }

    return KnexUserMapper.toDomain(user)
  }

  async create(user: User) {
    await knex('users').insert(KnexUserMapper.toKnex(user))
  }
}
