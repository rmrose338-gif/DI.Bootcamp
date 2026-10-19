import { useEffect, useState } from 'react'

interface User {
  id: number
  name: string
  email: string
}

function isUser(value: unknown): value is User {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  return (
    'id' in value &&
    typeof value.id === 'number' &&
    'name' in value &&
    typeof value.name === 'string' &&
    'email' in value &&
    typeof value.email === 'string'
  )
}

function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const loadUsers = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users',
          { signal: controller.signal },
        )

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}.`)
        }

        const payload: unknown = await response.json()
        if (!Array.isArray(payload) || !payload.every(isUser)) {
          throw new Error('The server returned data in an unexpected format.')
        }

        setUsers(payload)
      } catch (fetchError: unknown) {
        if (
          fetchError instanceof Error &&
          fetchError.name === 'AbortError'
        ) {
          return
        }

        setError(
          fetchError instanceof Error
            ? fetchError.message
            : 'An unexpected error occurred while loading users.',
        )
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void loadUsers()

    return () => controller.abort()
  }, [])

  if (isLoading) {
    return (
      <p className="user-list-status" role="status">
        Loading users…
      </p>
    )
  }

  if (error !== null) {
    return (
      <p className="user-list-status error" role="alert">
        Could not load users: {error}
      </p>
    )
  }

  return (
    <ul className="api-user-list">
      {users.map((user) => (
        <li key={user.id}>
          <strong>{user.name}</strong>
          <span>{user.email}</span>
        </li>
      ))}
    </ul>
  )
}

export default UserList
