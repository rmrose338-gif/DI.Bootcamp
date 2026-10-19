import type { Key, ReactNode } from 'react'

interface ListProps<T> {
  items: readonly T[]
  getKey: (item: T) => Key
  renderItem: (item: T) => ReactNode
  emptyMessage: string
}

function List<T>({ items, getKey, renderItem, emptyMessage }: ListProps<T>) {
  if (items.length === 0) {
    return <p className="empty-shelf">{emptyMessage}</p>
  }

  return (
    <ul className="book-list">
      {items.map((item) => (
        <li className="book-list-item" key={getKey(item)}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  )
}

export default List
