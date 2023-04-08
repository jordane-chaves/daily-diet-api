import { randomUUID } from 'node:crypto'

export interface UserProps {
  name: string
  email: string
  passwordHash: string
}

export class User {
  private _id: string
  private props: UserProps

  constructor(props: UserProps, id?: string) {
    this.props = props
    this._id = id ?? randomUUID()
  }

  get id() {
    return this._id
  }

  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get passwordHash() {
    return this.props.passwordHash
  }
}
