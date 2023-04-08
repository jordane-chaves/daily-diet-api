import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'
import request from 'supertest'

import { knex } from '@/shared/infra/database/knex'
import { KnexMealMapper } from '@/shared/infra/database/knex/mappers/knex-meal-mapper'
import { makeMeal } from '@/test/factories/meal-factory'

import { app } from '../../app'

describe('Get Meal (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
    await knex.destroy()
  })

  it('should be able to get a user meal', async () => {
    const user = await knex('users')
      .insert({
        id: randomUUID(),
        name: 'John Doe',
        email: 'johndoe@example.com',
        password_hash: await hash('123456', 6),
      })
      .returning('id')

    const userId = user[0].id

    const meal = makeMeal({ userId })

    await knex('meals').insert(KnexMealMapper.toKnex(meal))

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    const { token } = authResponse.body

    const response = await request(app.server)
      .get(`/meals/${meal.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('meal')
    expect(response.body.meal).toEqual(
      expect.objectContaining({
        user_id: userId,
      }),
    )
  })
})
