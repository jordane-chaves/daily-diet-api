import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { randomUUID } from 'node:crypto'
import { hash } from 'bcryptjs'
import request from 'supertest'

import { knex } from '@/shared/infra/database/knex'

import { app } from '../../app'

describe('Delete Meal (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
    await knex.destroy()
  })

  it('should be able to delete a user meal', async () => {
    const user = await knex('users')
      .insert({
        id: randomUUID(),
        name: 'John Doe',
        email: 'johndoe@example.com',
        password_hash: await hash('123456', 6),
      })
      .returning('*')

    const meal = await knex('meals')
      .insert({
        id: randomUUID(),
        user_id: user[0].id,
        name: 'Sanduíche',
        description: 'Sanduíche natural de frango',
        on_diet: true,
        date: new Date(2023, 4, 2, 14, 40),
      })
      .returning('*')

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    const { token } = authResponse.body

    const response = await request(app.server)
      .delete(`/meals/${meal[0].id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(204)
  })
})
