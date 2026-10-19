# Week 10, Day 1: Daily Challenge

A React and TypeScript book list that demonstrates a reusable generic list component and typed state.

## Run the project

```sh
npm install
npm run dev
```

Run the TypeScript check and production build with:

```sh
npm run build
```

## TypeScript concepts

- `src/types/Book.ts` defines the shape of each book.
- `src/components/List.tsx` is a generic list with a typed item renderer and key selector.
- `src/App.tsx` manages the book collection with `useState` and adds books with unique IDs.
