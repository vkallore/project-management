import { useState, useCallback } from 'react'

export const useMenuToggle = currentState => {
  const [menuToggle, setMenuToggle] = useState(currentState)
  const setToggle = useCallback(() => {
    setMenuToggle(!menuToggle)
  })
  return [menuToggle, setToggle]
}
