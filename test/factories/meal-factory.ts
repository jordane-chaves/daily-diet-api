import { Meal, MealProps } from '@/application/meals/entities/meal'

type Override = Partial<MealProps>

export function makeMeal(override: Override = {}) {
  return new Meal({
    userId: 'example-user-id',
    name: 'Sanduíche',
    description: 'Sanduíche natural de frango',
    onDiet: true,
    date: new Date(2023, 4, 2, 14, 40),
    ...override,
  })
}
