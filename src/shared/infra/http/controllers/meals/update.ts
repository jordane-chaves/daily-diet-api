import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { MealNotFoundError } from '@/application/meals/use-cases/errors/meal-not-found-error'
import { makeUpdateMealUseCase } from '@/application/meals/use-cases/factories/make-update-meal-use-case'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateMealBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    onDiet: z.boolean(),
    date: z.coerce.date(),
  })

  const updateMealParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { name, description, onDiet, date } = updateMealBodySchema.parse(
    request.body,
  )

  const { id } = updateMealParamsSchema.parse(request.params)

  try {
    const updateMealUseCase = makeUpdateMealUseCase()

    await updateMealUseCase.execute({
      mealId: id,
      userId: request.user.sub,
      name,
      description,
      onDiet,
      date,
    })

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof MealNotFoundError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
