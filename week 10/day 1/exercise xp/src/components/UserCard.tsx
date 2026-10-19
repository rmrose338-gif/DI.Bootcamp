interface UserCardProps {
  name?: string
  age?: number
  role?: string
}

function UserCard({
  name = 'Guest User',
  age = 0,
  role = 'No role assigned',
}: UserCardProps) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .filter((initial): initial is string => initial !== undefined)
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <article className="user-card">
      <span className="user-avatar" aria-hidden="true">
        {initials || '?'}
      </span>
      <div className="user-card-details">
        <h3>{name}</h3>
        <p>
          {age > 0 ? `${age} years old` : 'Age not provided'} · {role}
        </p>
      </div>
    </article>
  )
}

export default UserCard
