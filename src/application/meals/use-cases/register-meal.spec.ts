import { beforeEach, describe, expect, it } from 'vitest'

import { makeMeal } from '@/test/factories/meal-factory'
import { InMemoryMealsRepository } from '@/test/repositories/in-memory-meals-repository'

import { RegisterMealUseCase } from './register-meal'

let sut: RegisterMealUseCase
let inMemoryMealsRepository: InMemoryMealsRepository

describe('Register Meal Use Case', () => {
  beforeEach(() => {
    inMemoryMealsRepository = new InMemoryMealsRepository()

    sut = new RegisterMealUseCase(inMemoryMealsRepository)
  })

  it('should be able to register a meal', async () => {
    const { meal } = await sut.execute(makeMeal())

    expect(inMemoryMealsRepository.items).toHaveLength(1)
    expect(meal.id).toEqual(expect.any(String))
  })
})
