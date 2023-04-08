import { FastifyReply, FastifyRequest } from 'fastify'

import { makeFetchUserMealsUseCase } from '@/application/meals/use-cases/factories/make-fetch-user-meals-use-case'

import { MealViewModel } from '../../view-models/meal-view-model'

export async function fetchUserMeals(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchUserMealsUseCase = makeFetchUserMealsUseCase()

  const { meals } = await fetchUserMealsUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({ meals: meals.map(MealViewModel.toHTTP) })
}
