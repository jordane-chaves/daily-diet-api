import { FastifyInstance } from 'fastify'

import { verifyJWT } from '../../middlewares/verify-jwt'
import { registerMeal } from './register-meal'
import { deleteMeal } from './delete-meal'
import { fetchUserMeals } from './fetch-user-meals'
import { getMeal } from './get-meal'
import { metrics } from './metrics'
import { update } from './update'

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/meals', fetchUserMeals)
  app.get('/meals/:id', getMeal)
  app.get('/meals/metrics', metrics)

  app.post('/meals', registerMeal)

  app.put('/meals/:id', update)
  app.delete('/meals/:id', deleteMeal)
}
