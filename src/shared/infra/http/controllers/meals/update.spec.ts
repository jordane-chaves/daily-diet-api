import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { knex } from '@/shared/infra/database/knex'
import { makeUser } from '@/test/factories/user-factory'
import { KnexUserMapper } from '@/shared/infra/database/knex/mappers/knex-user-mapper'
import { KnexMealMapper } from '@/shared/infra/database/knex/mappers/knex-meal-mapper'
import { makeMeal } from '@/test/factories/meal-factory'

import { app } from '../../app'

describe('Update Meal (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
    await knex.destroy()
  })

  it('should be able to update a meal', async () => {
    const user = await makeUser()
    await knex('users').insert(KnexUserMapper.toKnex(user))

    const meal = makeMeal({ userId: user.id })
    await knex('meals').insert(KnexMealMapper.toKnex(meal))

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    const { token } = authResponse.body

    const response = await request(app.server)
      .put(`/meals/${meal.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Bolo de Cenoura',
        description: 'Bolo de cenoura com calda de chocolate',
        onDiet: false,
        date: new Date(2023, 4, 2, 15, 0),
      })

    expect(response.statusCode).toBe(204)

    const updatedMeal = await knex('meals').where({ id: meal.id }).first()

    expect(updatedMeal).toEqual(
      expect.objectContaining({
        name: 'Bolo de Cenoura',
        description: 'Bolo de cenoura com calda de chocolate',
        on_diet: 0,
        date: new Date(2023, 4, 2, 15, 0).getTime(),
      }),
    )
  })
})
