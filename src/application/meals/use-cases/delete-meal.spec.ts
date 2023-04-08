import { beforeEach, describe, expect, it } from 'vitest'

import { makeMeal } from '@/test/factories/meal-factory'
import { InMemoryMealsRepository } from '@/test/repositories/in-memory-meals-repository'

import { DeleteMealUseCase } from './delete-meal'
import { MealNotFoundError } from './errors/meal-not-found-error'

let sut: DeleteMealUseCase
let inMemoryMealsRepository: InMemoryMealsRepository

describe('Delete Meal Use Case', () => {
  beforeEach(() => {
    inMemoryMealsRepository = new InMemoryMealsRepository()

    sut = new DeleteMealUseCase(inMemoryMealsRepository)
  })

  it('should be able to delete a meal', async () => {
    inMemoryMealsRepository.items.push(makeMeal())

    const meal = makeMeal({
      name: 'X-Tudo',
      description: 'Xis da hamburgueria do bairro',
      onDiet: false,
      date: new Date(2023, 4, 2, 20, 40),
    })

    inMemoryMealsRepository.items.push(meal)

    await sut.execute({ mealId: meal.id, userId: meal.userId })

    expect(inMemoryMealsRepository.items).toHaveLength(1)
    expect(inMemoryMealsRepository.items).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'X-Tudo',
        }),
      ]),
    )
  })

  it('should not be able to delete a non-existent meal', async () => {
    await expect(
      sut.execute({
        mealId: 'non-existent-meal-id',
        userId: 'example-user-id',
      }),
    ).rejects.toBeInstanceOf(MealNotFoundError)
  })

  it('should not be able to delete a meal from another user', async () => {
    const meal = makeMeal({ userId: 'user-01' })
    inMemoryMealsRepository.items.push(meal)

    await expect(
      sut.execute({ mealId: meal.id, userId: 'user-02' }),
    ).rejects.toBeInstanceOf(MealNotFoundError)
  })
})
