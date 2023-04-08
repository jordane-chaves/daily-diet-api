import { beforeEach, describe, expect, it } from 'vitest'

import { makeMeal } from '@/test/factories/meal-factory'
import { InMemoryMealsRepository } from '@/test/repositories/in-memory-meals-repository'

import { FetchUserMealsUseCase } from './fetch-user-meals'

let sut: FetchUserMealsUseCase
let inMemoryMealsRepository: InMemoryMealsRepository

describe('Fetch User Meals Use Case', () => {
  beforeEach(() => {
    inMemoryMealsRepository = new InMemoryMealsRepository()

    sut = new FetchUserMealsUseCase(inMemoryMealsRepository)
  })

  it('should be able to list all user meals', async () => {
    inMemoryMealsRepository.items.push(makeMeal({ userId: 'user-01' }))
    inMemoryMealsRepository.items.push(makeMeal({ userId: 'user-01' }))

    const { meals } = await sut.execute({ userId: 'user-01' })

    expect(meals).toHaveLength(2)
    expect(meals).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ userId: 'user-01' }),
        expect.objectContaining({ userId: 'user-01' }),
      ]),
    )
  })

  it('should not be able list another user meals', async () => {
    inMemoryMealsRepository.items.push(makeMeal({ userId: 'user-01' }))
    inMemoryMealsRepository.items.push(makeMeal({ userId: 'user-01' }))

    inMemoryMealsRepository.items.push(makeMeal({ userId: 'user-02' }))
    inMemoryMealsRepository.items.push(makeMeal({ userId: 'user-02' }))
    inMemoryMealsRepository.items.push(makeMeal({ userId: 'user-02' }))

    const { meals } = await sut.execute({ userId: 'user-01' })

    expect(meals).toHaveLength(2)
    expect(meals).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ userId: 'user-01' }),
        expect.objectContaining({ userId: 'user-01' }),
      ]),
    )
  })
})
