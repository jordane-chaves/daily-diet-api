import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeRegisterMealUseCase } from '@/application/meals/use-cases/factories/make-register-meal-use-case'

export async function registerMeal(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerMealBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    onDiet: z.boolean(),
    date: z.coerce.date(),
  })

  const { name, description, onDiet, date } = registerMealBodySchema.parse(
    request.body,
  )

  const registerMealUseCase = makeRegisterMealUseCase()

  await registerMealUseCase.execute({
    userId: request.user.sub,
    name,
    description,
    onDiet,
    date,
  })

  return reply.status(201).send()
}
