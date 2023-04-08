import { Meal } from '@/application/meals/entities/meal'
import { MealsRepository } from '@/application/meals/repositories/meals-repository'
import { knex } from '..'
import { KnexMealMapper } from '../mappers/knex-meal-mapper'

export class KnexMealsRepository implements MealsRepository {
  async findById(id: string) {
    const meal = await knex('meals').where({ id }).first()

    if (!meal) {
      return null
    }

    return KnexMealMapper.toDomain(meal)
  }

  async findByIdAndUserId(id: string, userId: string): Promise<Meal | null> {
    const meal = await knex('meals').where({ id, user_id: userId }).first()

    if (!meal) {
      return null
    }

    return KnexMealMapper.toDomain(meal)
  }

  async findManyByUserId(userId: string) {
    const meals = await knex('meals').where({ user_id: userId }).select()
    return meals.map(KnexMealMapper.toDomain)
  }

  async delete(id: string) {
    await knex('meals').where({ id }).delete()
  }

  async create(meal: Meal) {
    await knex('meals').insert(KnexMealMapper.toKnex(meal))
  }

  async save(meal: Meal) {
    await knex('meals').where({ id: meal.id }).update({
      user_id: meal.userId,
      name: meal.name,
      description: meal.description,
      on_diet: meal.onDiet,
      date: meal.date,
    })
  }
}
