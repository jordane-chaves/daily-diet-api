import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeGetMealUseCase } from '@/application/meals/use-cases/factories/make-get-meal-use-case'
import { MealNotFoundError } from '@/application/meals/use-cases/errors/meal-not-found-error'

import { MealViewModel } from '../../view-models/meal-view-model'

export async function getMeal(request: FastifyRequest, reply: FastifyReply) {
  const getMealParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = getMealParamsSchema.parse(request.params)

  try {
    const getMealUseCase = makeGetMealUseCase()
    const { meal } = await getMealUseCase.execute({
      mealId: id,
      userId: request.user.sub,
    })

    return reply.status(200).send({ meal: MealViewModel.toHTTP(meal) })
  } catch (error) {
    if (error instanceof MealNotFoundError) {
      return reply.status(400).send({
        message: error.message,
      })
    }

    throw error
  }
}
