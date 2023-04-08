import { beforeEach, describe, expect, it } from 'vitest'

import { makeMeal } from '@/test/factories/meal-factory'
import { InMemoryMealsRepository } from '@/test/repositories/in-memory-meals-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

let sut: GetUserMetricsUseCase
let inMemoryMealsRepository: InMemoryMealsRepository

describe('Get User Metrics Use Case', () => {
  beforeEach(() => {
    inMemoryMealsRepository = new InMemoryMealsRepository()

    sut = new GetUserMetricsUseCase(inMemoryMealsRepository)
  })

  it('should be able to get meals count from metrics', async () => {
    await inMemoryMealsRepository.create(makeMeal({ userId: 'user-01' }))
    await inMemoryMealsRepository.create(makeMeal({ userId: 'user-01' }))
    await inMemoryMealsRepository.create(makeMeal({ userId: 'user-01' }))

    const { mealsCount } = await sut.execute({ userId: 'user-01' })

    expect(mealsCount).toEqual(3)
  })

  it('should be able to get meal counts within the diet from metrics', async () => {
    await inMemoryMealsRepository.create(makeMeal({ userId: 'user-01' }))
    await inMemoryMealsRepository.create(makeMeal({ userId: 'user-01' }))

    await inMemoryMealsRepository.create(
      makeMeal({ userId: 'user-01', onDiet: false }),
    )

    await inMemoryMealsRepository.create(
      makeMeal({ userId: 'user-01', onDiet: false }),
    )

    await inMemoryMealsRepository.create(
      makeMeal({ userId: 'user-01', onDiet: false }),
    )

    const { mealsWithinDietCount } = await sut.execute({ userId: 'user-01' })

    expect(mealsWithinDietCount).toEqual(2)
  })

  it('should be able to get meal counts off the diet from metrics', async () => {
    await inMemoryMealsRepository.create(makeMeal({ userId: 'user-01' }))
    await inMemoryMealsRepository.create(makeMeal({ userId: 'user-01' }))

    await inMemoryMealsRepository.create(
      makeMeal({ userId: 'user-01', onDiet: false }),
    )

    await inMemoryMealsRepository.create(
      makeMeal({ userId: 'user-01', onDiet: false }),
    )

    await inMemoryMealsRepository.create(
      makeMeal({ userId: 'user-01', onDiet: false }),
    )

    const { mealsOffDietCount } = await sut.execute({ userId: 'user-01' })

    expect(mealsOffDietCount).toEqual(3)
  })

  it('should be able to get the best sequence of meals within the diet from metrics', async () => {
    for (let i = 0; i < 3; i++) {
      await inMemoryMealsRepository.create(makeMeal({ userId: 'user-01' }))
    }

    await inMemoryMealsRepository.create(
      makeMeal({ userId: 'user-01', onDiet: false }),
    )

    for (let i = 0; i < 5; i++) {
      await inMemoryMealsRepository.create(makeMeal({ userId: 'user-01' }))
    }

    const { bestSequenceWithinDietCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(bestSequenceWithinDietCount).toEqual(5)
  })
})
