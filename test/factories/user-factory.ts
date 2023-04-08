import { hash } from 'bcryptjs'

import { User, UserProps } from '@/application/users/entities/user'

type Override = Partial<UserProps>

export async function makeUser(override: Override = {}) {
  return new User({
    name: 'John Doe',
    email: 'johndoe@example.com',
    passwordHash: await hash('123456', 6),
    ...override,
  })
}
