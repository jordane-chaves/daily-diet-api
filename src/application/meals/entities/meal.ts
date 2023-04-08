import { randomUUID } from 'node:crypto'

export interface MealProps {
  userId: string
  name: string
  description: string
  onDiet: boolean
  date: Date
}

export class Meal {
  private _id: string
  private props: MealProps

  constructor(props: MealProps, id?: string) {
    this.props = props
    this._id = id ?? randomUUID()
  }

  get id() {
    return this._id
  }

  get userId() {
    return this.props.userId
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get description() {
    return this.props.description
  }

  set description(description: string) {
    this.props.description = description
  }

  get onDiet() {
    return this.props.onDiet
  }

  set onDiet(onDiet: boolean) {
    this.props.onDiet = onDiet
  }

  get date() {
    return this.props.date
  }

  set date(date: Date) {
    this.props.date = date
  }
}
