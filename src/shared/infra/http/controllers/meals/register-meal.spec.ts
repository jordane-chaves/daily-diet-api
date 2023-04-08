import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { knex } from '@/shared/infra/database/knex'

import { app } from '../../app'

describe('Register Meal (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
    await knex.destroy()
  })

  it('should be able to register a user meal', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    const { token } = authResponse.body

    const response = await request(app.server)
      .post('/meals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Sanduíche',
        description: 'Sanduíche natural de frango',
        onDiet: true,
        date: new Date(2023, 4, 2, 14, 40),
      })

    expect(response.statusCode).toEqual(201)
  })
})
