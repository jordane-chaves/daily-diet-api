import { randomUUID } from 'node:crypto'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { hash } from 'bcryptjs'

import { knex } from '@/shared/infra/database/knex'
import { KnexMealMapper } from '@/shared/infra/database/knex/mappers/knex-meal-mapper'
import { makeMeal } from '@/test/factories/meal-factory'

import { app } from '../../app'

describe('Fetch User Meals (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
    await knex.destroy()
  })

  it('should be able to get all user meals', async () => {
    const user = await knex('users')
      .insert({
        id: randomUUID(),
        name: 'John Doe',
        email: 'johndoe@example.com',
        password_hash: await hash('123456', 6),
      })
      .returning('id')

    const userId = user[0].id

    await knex('meals').insert([
      KnexMealMapper.toKnex(
        makeMeal({ userId, name: 'X-Tudo', onDiet: false }),
      ),
      KnexMealMapper.toKnex(
        makeMeal({ userId, name: 'Torrada com Nutella', onDiet: true }),
      ),
    ])

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    const { token } = authResponse.body

    const response = await request(app.server)
      .get('/meals')
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('meals')
    expect(response.body.meals).toHaveLength(2)
    expect(response.body.meals).toEqual([
      expect.objectContaining({
        user_id: userId,
        name: 'X-Tudo',
        on_diet: false,
      }),
      expect.objectContaining({
        user_id: userId,
        name: 'Torrada com Nutella',
        on_diet: true,
      }),
    ])
  })
})
