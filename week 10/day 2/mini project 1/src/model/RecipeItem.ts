import { v4 as createUuid } from 'uuid'

export interface RecipeData {
  id?: string
  title: string
  ingredients: string[]
  instructions: string
  isFavorite?: boolean
}

export class RecipeItem {
  readonly id: string
  readonly title: string
  readonly ingredients: string[]
  readonly instructions: string
  isFavorite: boolean

  constructor({
    id = createUuid(),
    title,
    ingredients,
    instructions,
    isFavorite = false,
  }: RecipeData) {
    this.id = id
    this.title = title
    this.ingredients = [...ingredients]
    this.instructions = instructions
    this.isFavorite = isFavorite
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite
  }
}
