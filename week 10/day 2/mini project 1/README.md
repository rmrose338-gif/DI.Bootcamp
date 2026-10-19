# Week 10, Day 2: Mini Project 1

A Vanilla TypeScript recipe book built with Vite. Recipes are saved in browser localStorage and can be added, deleted, expanded, and marked as favorites.

## Run the project

```sh
npm install
npm run dev
```

Create a production build with:

```sh
npm run build
```

## Project structure

- `src/model/RecipeItem.ts` defines a recipe and its favorite behavior.
- `src/model/RecipeCollection.ts` manages recipes and localStorage persistence.
- `src/templates/RecipeTemplate.ts` safely builds recipe cards and their DOM interactions.
- `src/main.ts` connects form submission, collection actions, and rendering.

Ingredients are entered one per line. Browser storage is local to the current browser and device.
