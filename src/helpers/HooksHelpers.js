import { useState } from 'react'

export const useMenuToggle = currentState => {
  const [menuToggle, setMenuToggle] = useState(currentState)
  const setToggle = () => {
    setMenuToggle(!menuToggle)
  }
  return [menuToggle, setToggle]
}
