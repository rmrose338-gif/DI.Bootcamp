interface GreetingProps {
  name: string
  messageCount: number
}

function Greeting({ name, messageCount }: GreetingProps) {
  return (
    <p className="greeting">
      Hello, <strong>{name}</strong>! You have {messageCount}{' '}
      {messageCount === 1 ? 'new message' : 'new messages'}.
    </p>
  )
}

export default Greeting
