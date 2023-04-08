import { Meal } from '@/application/meals/entities/meal'

interface RawMeal {
  id: string
  user_id: string
  name: string
  description: string
  on_diet: boolean
  date: Date
}

export class KnexMealMapper {
  static toKnex(meal: Meal): RawMeal {
    return {
      id: meal.id,
      user_id: meal.userId,
      name: meal.name,
      description: meal.description,
      on_diet: meal.onDiet,
      date: meal.date,
    }
  }

  static toDomain(raw: RawMeal) {
    let onDiet = raw.on_diet

    if (typeof raw.on_diet === 'number') {
      onDiet = raw.on_diet === 1 // convert 0 or 1 to true or false
    }

    return new Meal(
      {
        userId: raw.user_id,
        name: raw.name,
        description: raw.description,
        date: raw.date,
        onDiet,
      },
      raw.id,
    )
  }
}
