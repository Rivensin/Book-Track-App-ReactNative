import { useContext } from 'react'
import { UserContext } from '../contexts/useContexts'

function UseUser() {
  const context = useContext(UserContext)

  if(!context) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return context
}

export default UseUser