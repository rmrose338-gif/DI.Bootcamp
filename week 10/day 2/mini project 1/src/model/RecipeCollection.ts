import { RecipeItem, type RecipeData } from './RecipeItem'

const STORAGE_KEY = 'week-10-day-2-recipe-book'

function isRecipeData(value: unknown): value is RecipeData & { id: string; isFavorite: boolean } {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  return (
    'id' in value &&
    typeof value.id === 'string' &&
    'title' in value &&
    typeof value.title === 'string' &&
    'ingredients' in value &&
    Array.isArray(value.ingredients) &&
    value.ingredients.every((ingredient: unknown) => typeof ingredient === 'string') &&
    'instructions' in value &&
    typeof value.instructions === 'string' &&
    'isFavorite' in value &&
    typeof value.isFavorite === 'boolean'
  )
}

export class RecipeCollection {
  private recipes: RecipeItem[] = []

  getRecipes(): readonly RecipeItem[] {
    return this.recipes
  }

  addRecipe(data: Omit<RecipeData, 'id' | 'isFavorite'>): RecipeItem {
    const recipe = new RecipeItem(data)
    const updatedRecipes = [...this.recipes, recipe]
    this.persist(updatedRecipes)
    this.recipes = updatedRecipes
    return recipe
  }

  removeRecipe(id: string): RecipeItem | undefined {
    const recipe = this.recipes.find((item) => item.id === id)
    if (recipe === undefined) {
      return undefined
    }

    const updatedRecipes = this.recipes.filter((item) => item.id !== id)
    this.persist(updatedRecipes)
    this.recipes = updatedRecipes
    return recipe
  }

  toggleFavorite(id: string): RecipeItem {
    const recipeIndex = this.recipes.findIndex((item) => item.id === id)
    if (recipeIndex === -1) {
      throw new Error('The selected recipe no longer exists.')
    }

    const updatedRecipe = new RecipeItem(this.recipes[recipeIndex])
    updatedRecipe.toggleFavorite()
    const updatedRecipes = this.recipes.map((item, index) =>
      index === recipeIndex ? updatedRecipe : item,
    )
    this.persist(updatedRecipes)
    this.recipes = updatedRecipes
    return updatedRecipe
  }

  clearRecipes(): void {
    this.persist([])
    this.recipes = []
  }

  saveToLocalStorage(): void {
    this.persist(this.recipes)
  }

  loadFromLocalStorage(): void {
    const storedRecipes = window.localStorage.getItem(STORAGE_KEY)
    if (storedRecipes === null) {
      this.recipes = []
      return
    }

    let parsedRecipes: unknown
    try {
      parsedRecipes = JSON.parse(storedRecipes)
    } catch {
      throw new Error('Saved recipe data is not valid JSON.')
    }

    if (!Array.isArray(parsedRecipes) || !parsedRecipes.every(isRecipeData)) {
      throw new Error('Saved recipe data has an unexpected format.')
    }

    this.recipes = parsedRecipes.map((recipe) => new RecipeItem(recipe))
  }

  private persist(recipes: readonly RecipeItem[]): void {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes))
  }
}
