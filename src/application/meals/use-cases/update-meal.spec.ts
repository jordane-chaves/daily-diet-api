import { beforeEach, describe, expect, it } from 'vitest'

import { makeMeal } from '@/test/factories/meal-factory'
import { InMemoryMealsRepository } from '@/test/repositories/in-memory-meals-repository'

import { UpdateMealUseCase } from './update-meal'
import { MealNotFoundError } from './errors/meal-not-found-error'

let sut: UpdateMealUseCase
let inMemoryMealsRepository: InMemoryMealsRepository

describe('Update Meal Use Case', () => {
  beforeEach(() => {
    inMemoryMealsRepository = new InMemoryMealsRepository()

    sut = new UpdateMealUseCase(inMemoryMealsRepository)
  })

  it('should be able to update a meal name', async () => {
    const meal = makeMeal()
    inMemoryMealsRepository.items.push(meal)

    await sut.execute({
      mealId: meal.id,
      userId: meal.userId,
      name: 'X-Tudo',
    })

    expect(inMemoryMealsRepository.items[0].name).toEqual('X-Tudo')
  })

  it('should be able to update a meal description', async () => {
    const meal = makeMeal()
    inMemoryMealsRepository.items.push(meal)

    await sut.execute({
      mealId: meal.id,
      userId: meal.userId,
      description: 'Xis da hamburgueria do bairro',
    })

    expect(inMemoryMealsRepository.items[0].description).toEqual(
      'Xis da hamburgueria do bairro',
    )
  })

  it('should be able to update a meal on diet', async () => {
    const meal = makeMeal()
    inMemoryMealsRepository.items.push(meal)

    await sut.execute({
      mealId: meal.id,
      userId: meal.userId,
      onDiet: false,
    })

    expect(inMemoryMealsRepository.items[0].onDiet).toEqual(false)
  })

  it('should be able to update a meal date', async () => {
    const meal = makeMeal()
    inMemoryMealsRepository.items.push(meal)

    await sut.execute({
      mealId: meal.id,
      userId: meal.userId,
      date: new Date(2023, 4, 3, 20, 0),
    })

    expect(inMemoryMealsRepository.items[0].date).toEqual(
      new Date(2023, 4, 3, 20, 0),
    )
  })

  it('should not be able to update a non-existent meal', async () => {
    await expect(
      sut.execute({
        mealId: 'non-existent-meal-id',
        userId: 'example-user-id',
        name: 'Example name',
      }),
    ).rejects.toBeInstanceOf(MealNotFoundError)
  })

  it('should not be able to update a meal from another user', async () => {
    const meal = makeMeal({ userId: 'user-01' })
    inMemoryMealsRepository.items.push(meal)

    await expect(
      sut.execute({ mealId: meal.id, userId: 'user-02' }),
    ).rejects.toBeInstanceOf(MealNotFoundError)
  })
})
