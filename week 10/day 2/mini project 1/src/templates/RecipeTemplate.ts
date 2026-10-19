import type { RecipeItem } from '../model/RecipeItem'

export class RecipeTemplate {
  private readonly container: HTMLElement

  constructor(container: HTMLElement) {
    this.container = container
  }

  render(recipes: readonly RecipeItem[]): void {
    this.container.replaceChildren()

    if (recipes.length === 0) {
      const emptyMessage = document.createElement('p')
      emptyMessage.className = 'empty-state'
      emptyMessage.textContent = 'Your recipe book is empty. Add a favorite to get started.'
      this.container.append(emptyMessage)
      return
    }

    const fragment = document.createDocumentFragment()
    for (const recipe of recipes) {
      fragment.append(this.createRecipeCard(recipe))
    }
    this.container.append(fragment)
  }

  private createRecipeCard(recipe: RecipeItem): HTMLElement {
    const card = document.createElement('article')
    card.className = 'recipe-card'
    card.dataset.recipeId = recipe.id

    const header = document.createElement('div')
    header.className = 'recipe-card-header'

    const title = document.createElement('h2')
    title.className = 'recipe-title'
    title.textContent = recipe.title

    const favoriteButton = document.createElement('button')
    favoriteButton.className = 'icon-button favorite-button'
    favoriteButton.type = 'button'
    favoriteButton.dataset.action = 'favorite'
    favoriteButton.dataset.recipeId = recipe.id
    favoriteButton.setAttribute('aria-pressed', String(recipe.isFavorite))
    favoriteButton.setAttribute(
      'aria-label',
      recipe.isFavorite ? `Remove ${recipe.title} from favorites` : `Add ${recipe.title} to favorites`,
    )
    favoriteButton.textContent = recipe.isFavorite ? '★' : '☆'

    header.append(title, favoriteButton)

    const details = document.createElement('details')
    details.className = 'recipe-details'
    const summary = document.createElement('summary')
    summary.textContent = 'View recipe'
    details.append(summary)

    const ingredientsHeading = document.createElement('h3')
    ingredientsHeading.textContent = 'Ingredients'
    const ingredientList = document.createElement('ul')
    ingredientList.className = 'ingredient-list'
    for (const ingredient of recipe.ingredients) {
      const listItem = document.createElement('li')
      listItem.textContent = ingredient
      ingredientList.append(listItem)
    }

    const instructionsHeading = document.createElement('h3')
    instructionsHeading.textContent = 'Instructions'
    const instructions = document.createElement('p')
    instructions.className = 'recipe-instructions'
    instructions.textContent = recipe.instructions

    const deleteButton = document.createElement('button')
    deleteButton.className = 'delete-button'
    deleteButton.type = 'button'
    deleteButton.dataset.action = 'delete'
    deleteButton.dataset.recipeId = recipe.id
    deleteButton.textContent = 'Delete recipe'

    details.append(
      ingredientsHeading,
      ingredientList,
      instructionsHeading,
      instructions,
      deleteButton,
    )
    card.append(header, details)
    return card
  }
}
