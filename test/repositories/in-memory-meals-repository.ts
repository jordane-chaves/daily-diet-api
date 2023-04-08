import { Meal } from '@/application/meals/entities/meal'
import { MealsRepository } from '@/application/meals/repositories/meals-repository'

export class InMemoryMealsRepository implements MealsRepository {
  items: Meal[] = []

  async findById(id: string) {
    const meal = this.items.find((item) => item.id === id)

    if (!meal) {
      return null
    }

    return new Meal(
      {
        name: meal.name,
        description: meal.description,
        onDiet: meal.onDiet,
        date: meal.date,
        userId: meal.userId,
      },
      meal.id,
    )
  }

  async findByIdAndUserId(id: string, userId: string) {
    const meal = this.items.find(
      (item) => item.id === id && item.userId === userId,
    )

    if (!meal) {
      return null
    }

    return meal
  }

  async findManyByUserId(userId: string): Promise<Meal[]> {
    const meals = this.items.filter((item) => item.userId === userId)

    return meals
  }

  async delete(id: string): Promise<void> {
    const mealIndex = this.items.findIndex((item) => item.id === id)

    if (mealIndex >= 0) {
      this.items.splice(mealIndex, 1)
    }
  }

  async create(meal: Meal) {
    this.items.push(meal)
  }

  async save(meal: Meal): Promise<void> {
    const mealIndex = this.items.findIndex((item) => item.id === meal.id)

    if (mealIndex >= 0) {
      this.items[mealIndex] = meal
    }
  }
}
