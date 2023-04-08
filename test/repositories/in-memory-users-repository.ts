import { User } from '@/application/users/entities/user'
import { UsersRepository } from '@/application/users/repositories/users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  items: User[] = []

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(user: User) {
    this.items.push(user)
  }
}
