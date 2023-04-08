import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { MealNotFoundError } from '@/application/meals/use-cases/errors/meal-not-found-error'
import { makeDeleteMealUseCase } from '@/application/meals/use-cases/factories/make-delete-meal-use-case'

export async function deleteMeal(request: FastifyRequest, reply: FastifyReply) {
  const deleteMealParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = deleteMealParamsSchema.parse(request.params)

  try {
    const deleteMealUseCase = makeDeleteMealUseCase()

    await deleteMealUseCase.execute({
      mealId: id,
      userId: request.user.sub,
    })

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof MealNotFoundError) {
      return reply.status(400).send({
        message: error.message,
      })
    }

    throw error
  }
}
