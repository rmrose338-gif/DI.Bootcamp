import { useCallback, useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, deleteCategory, editCategory } from '../redux/productivitySlice.js'
import { selectCategories, selectCategoryById } from '../redux/selectors.js'

const categoryColors = ['green', 'coral', 'blue', 'gold']

function CategorySelector({ selectedCategoryId, onSelectCategory }) {
  const dispatch = useDispatch()
  const categories = useSelector(selectCategories)
  const selectedCategory = useSelector((state) => selectCategoryById(state, selectedCategoryId))
  const [newCategoryName, setNewCategoryName] = useState('')
  const [editingCategoryId, setEditingCategoryId] = useState(null)
  const [categoryDraft, setCategoryDraft] = useState('')

  const handleAddCategory = useCallback((event) => {
    event.preventDefault()
    const name = newCategoryName.trim()
    if (!name) return

    dispatch(addCategory({
      id: nanoid(),
      name,
      color: categoryColors[categories.length % categoryColors.length],
    }))
    setNewCategoryName('')
  }, [categories.length, dispatch, newCategoryName])

  const handleBeginEdit = useCallback((category) => {
    setEditingCategoryId(category.id)
    setCategoryDraft(category.name)
  }, [])

  const handleSaveCategory = useCallback((event) => {
    event.preventDefault()
    const name = categoryDraft.trim()
    if (!name) return

    dispatch(editCategory({ id: editingCategoryId, name }))
    setEditingCategoryId(null)
    setCategoryDraft('')
  }, [categoryDraft, dispatch, editingCategoryId])

  const handleDeleteCategory = useCallback((categoryId) => {
    dispatch(deleteCategory(categoryId))
    if (selectedCategoryId === categoryId) onSelectCategory('all')
  }, [dispatch, onSelectCategory, selectedCategoryId])

  return (
    <aside className="category-panel" aria-labelledby="category-title">
      <div className="category-panel-heading">
        <p className="panel-kicker">YOUR WORKSPACE</p>
        <h2 id="category-title">Categories</h2>
      </div>

      <nav className="category-nav" aria-label="Task categories">
        <button
          className={`category-choice${selectedCategoryId === 'all' ? ' is-selected' : ''}`}
          type="button"
          aria-current={selectedCategoryId === 'all' ? 'page' : undefined}
          onClick={() => onSelectCategory('all')}
        >
          <span className="category-dot all-dot" />
          <span>All tasks</span>
          <span className="category-arrow" aria-hidden="true">↗</span>
        </button>

        {categories.map((category) => (
          <div className={`category-line${selectedCategoryId === category.id ? ' is-selected' : ''}`} key={category.id}>
            {editingCategoryId === category.id ? (
              <form className="category-edit-form" onSubmit={handleSaveCategory}>
                <input
                  aria-label={`Edit ${category.name} category name`}
                  value={categoryDraft}
                  onChange={(event) => setCategoryDraft(event.target.value)}
                  maxLength={28}
                  autoFocus
                />
                <button type="submit" aria-label="Save category name" title="Save">✓</button>
              </form>
            ) : (
              <>
                <button
                  className="category-choice"
                  type="button"
                  aria-current={selectedCategoryId === category.id ? 'page' : undefined}
                  onClick={() => onSelectCategory(category.id)}
                >
                  <span className={`category-dot dot-${category.color}`} />
                  <span>{category.name}</span>
                  <span className="category-arrow" aria-hidden="true">↗</span>
                </button>
                <div className="category-actions">
                  <button type="button" aria-label={`Rename ${category.name}`} title="Rename category" onClick={() => handleBeginEdit(category)}>✎</button>
                  <button type="button" aria-label={`Delete ${category.name}`} title="Delete category and its tasks" onClick={() => handleDeleteCategory(category.id)}>×</button>
                </div>
              </>
            )}
          </div>
        ))}
      </nav>

      <form className="add-category-form" onSubmit={handleAddCategory}>
        <label className="visually-hidden" htmlFor="new-category">New category name</label>
        <input
          id="new-category"
          value={newCategoryName}
          onChange={(event) => setNewCategoryName(event.target.value)}
          placeholder="New category"
          maxLength={28}
        />
        <button type="submit" disabled={!newCategoryName.trim()} aria-label="Add category" title="Add category">+</button>
      </form>

      <div className="selected-category-note">
        <span className="note-mark" aria-hidden="true">✳</span>
        <p>{selectedCategory ? `Focused on ${selectedCategory.name}.` : 'A little progress, in every corner.'}</p>
      </div>
    </aside>
  )
}

export default CategorySelector