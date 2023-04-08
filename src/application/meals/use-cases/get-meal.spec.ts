import { beforeEach, describe, expect, it } from 'vitest'

import { makeMeal } from '@/test/factories/meal-factory'
import { InMemoryMealsRepository } from '@/test/repositories/in-memory-meals-repository'

import { GetMealUseCase } from './get-meal'
import { MealNotFoundError } from './errors/meal-not-found-error'

let sut: GetMealUseCase
let inMemoryMealsRepository: InMemoryMealsRepository

describe('Get Meal Use Case', () => {
  beforeEach(() => {
    inMemoryMealsRepository = new InMemoryMealsRepository()

    sut = new GetMealUseCase(inMemoryMealsRepository)
  })

  it('should be able to get a meal', async () => {
    const createdMeal = makeMeal()
    inMemoryMealsRepository.items.push(createdMeal)

    const { meal } = await sut.execute({
      mealId: createdMeal.id,
      userId: createdMeal.userId,
    })

    expect(meal).toEqual(createdMeal)
  })

  it('should not be able to get a meal from another user', async () => {
    const meal = makeMeal({ userId: 'user-01' })
    inMemoryMealsRepository.items.push(meal)

    await expect(
      sut.execute({ mealId: meal.id, userId: 'user-02' }),
    ).rejects.toBeInstanceOf(MealNotFoundError)
  })

  it('should not be able to get a non-existent meal', async () => {
    await expect(
      sut.execute({
        mealId: 'non-existent-meal-id',
        userId: 'example-user-id',
      }),
    ).rejects.toBeInstanceOf(MealNotFoundError)
  })
})
