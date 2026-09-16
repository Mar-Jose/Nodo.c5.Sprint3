import { useEffect, useState } from 'react'

function readLocalStorageValue(key, initialValue) {
  if (typeof window === 'undefined') return initialValue

  const storedValue = window.localStorage.getItem(key)

  if (storedValue === null) return initialValue

  try {
    return JSON.parse(storedValue)
  } catch {
    return initialValue
  }
}

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readLocalStorageValue(key, initialValue))

  useEffect(() => {
    if (typeof window === 'undefined') return

    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}