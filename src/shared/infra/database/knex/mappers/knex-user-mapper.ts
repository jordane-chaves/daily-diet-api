import { User } from '@/application/users/entities/user'

interface RawUser {
  id: string
  name: string
  email: string
  password_hash: string
}

export class KnexUserMapper {
  static toKnex(user: User): RawUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password_hash: user.passwordHash,
    }
  }

  static toDomain(raw: RawUser) {
    return new User(
      {
        email: raw.email,
        name: raw.name,
        passwordHash: raw.password_hash,
      },
      raw.id,
    )
  }
}
