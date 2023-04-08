import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { knex } from '@/shared/infra/database/knex'
import { KnexMealMapper } from '@/shared/infra/database/knex/mappers/knex-meal-mapper'
import { makeMeal } from '@/test/factories/meal-factory'
import { makeUser } from '@/test/factories/user-factory'
import { KnexUserMapper } from '@/shared/infra/database/knex/mappers/knex-user-mapper'

import { app } from '../../app'

describe('Meals Metrics (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
    await knex.destroy()
  })

  it('should be able to get a user meal', async () => {
    const user = await makeUser()
    await knex('users').insert(KnexUserMapper.toKnex(user))

    const userId = user.id

    await knex('meals').insert([
      KnexMealMapper.toKnex(makeMeal({ userId, onDiet: true })),
      KnexMealMapper.toKnex(makeMeal({ userId, onDiet: true })),
      KnexMealMapper.toKnex(makeMeal({ userId, onDiet: false })),
      KnexMealMapper.toKnex(makeMeal({ userId, onDiet: false })),
      KnexMealMapper.toKnex(makeMeal({ userId, onDiet: false })),
    ])

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    const { token } = authResponse.body

    const response = await request(app.server)
      .get('/meals/metrics')
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('metrics')
    expect(response.body.metrics).toEqual(
      expect.objectContaining({
        mealsCount: 5,
        mealsWithinDietCount: 2,
        mealsOffDietCount: 3,
        bestSequenceWithinDietCount: 2,
      }),
    )
  })
})
