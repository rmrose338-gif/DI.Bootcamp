import './style.css'
import { RecipeCollection } from './model/RecipeCollection'
import { RecipeTemplate } from './templates/RecipeTemplate'

function getElement<T extends HTMLElement>(selector: string): T {
  const element = document.querySelector<T>(selector)
  if (element === null) {
    throw new Error(`Required page element "${selector}" was not found.`)
  }
  return element
}

const form = getElement<HTMLFormElement>('#recipeEntryForm')
const titleInput = getElement<HTMLInputElement>('#recipeTitle')
const ingredientsInput = getElement<HTMLTextAreaElement>('#ingredients')
const instructionsInput = getElement<HTMLTextAreaElement>('#instructions')
const recipeContainer = getElement<HTMLDivElement>('#recipeContainer')
const clearRecipesButton = getElement<HTMLButtonElement>('#clearRecipesButton')
const recipeCount = getElement<HTMLSpanElement>('#recipeCount')
const statusMessage = getElement<HTMLParagraphElement>('#statusMessage')

const collection = new RecipeCollection()
const recipeTemplate = new RecipeTemplate(recipeContainer)

function showMessage(message: string, isError = false): void {
  statusMessage.textContent = message
  statusMessage.classList.toggle('is-error', isError)
}

function renderRecipes(): void {
  const recipes = collection.getRecipes()
  recipeTemplate.render(recipes)
  recipeCount.textContent = `${recipes.length} ${recipes.length === 1 ? 'recipe' : 'recipes'}`
  clearRecipesButton.disabled = recipes.length === 0
}

try {
  collection.loadFromLocalStorage()
  renderRecipes()
} catch (error: unknown) {
  showMessage(
    error instanceof Error
      ? `Saved recipes could not be loaded: ${error.message}`
      : 'Saved recipes could not be loaded because of an unexpected error.',
    true,
  )
  renderRecipes()
}

form.addEventListener('submit', (event: SubmitEvent) => {
  event.preventDefault()

  const title = titleInput.value.trim()
  const ingredients = ingredientsInput.value
    .split(/\r?\n/)
    .map((ingredient) => ingredient.trim())
    .filter((ingredient) => ingredient.length > 0)
  const instructions = instructionsInput.value.trim()

  if (!title || ingredients.length === 0 || !instructions) {
    showMessage('Enter a title, at least one ingredient, and the instructions.', true)
    return
  }

  try {
    collection.addRecipe({ title, ingredients, instructions })
    renderRecipes()
    form.reset()
    showMessage(`"${title}" was added to your recipe book.`)
    titleInput.focus()
  } catch (error: unknown) {
    showMessage(
      error instanceof Error
        ? `The recipe could not be saved: ${error.message}`
        : 'The recipe could not be saved because of an unexpected error.',
      true,
    )
  }
})

recipeContainer.addEventListener('click', (event: MouseEvent) => {
  const target = event.target
  if (!(target instanceof Element)) {
    return
  }

  const actionButton = target.closest<HTMLButtonElement>('button[data-action]')
  if (actionButton === null) {
    return
  }

  const recipeId = actionButton.dataset.recipeId
  const action = actionButton.dataset.action
  if (recipeId === undefined) {
    showMessage('This recipe action is missing its recipe identifier.', true)
    return
  }

  try {
    if (action === 'favorite') {
      const recipe = collection.toggleFavorite(recipeId)
      renderRecipes()
      showMessage(
        `"${recipe.title}" ${recipe.isFavorite ? 'added to' : 'removed from'} your favorites.`,
      )
    } else if (action === 'delete') {
      const recipe = collection.removeRecipe(recipeId)
      if (recipe !== undefined) {
        renderRecipes()
        showMessage(`"${recipe.title}" was removed from your recipe book.`)
      }
    }
  } catch (error: unknown) {
    showMessage(
      error instanceof Error
        ? `The recipe could not be updated: ${error.message}`
        : 'The recipe could not be updated because of an unexpected error.',
      true,
    )
  }
})

clearRecipesButton.addEventListener('click', () => {
  if (collection.getRecipes().length === 0) {
    showMessage('Your recipe book is already empty.')
    return
  }

  try {
    collection.clearRecipes()
    renderRecipes()
    showMessage('All recipes have been cleared.')
  } catch (error: unknown) {
    showMessage(
      error instanceof Error
        ? `Recipes could not be cleared: ${error.message}`
        : 'Recipes could not be cleared because of an unexpected error.',
      true,
    )
  }
})
