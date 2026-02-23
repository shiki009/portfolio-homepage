import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const GameModeContext = createContext({
  isGameMode: false,
  setIsGameMode: () => {}
})

const KONAMI = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

export const GameModeProvider = ({ children }) => {
  const [isGameMode, setIsGameMode] = useState(false)

  const handleKonami = useCallback(() => {
    let pos = 0
    let timer = null

    const onKey = (e) => {
      // Ignore held-down repeats
      if (e.repeat) return
      // Ignore modifier keys, shift, etc.
      if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab'].includes(e.key)) return

      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key

      if (key === KONAMI[pos]) {
        pos++
        clearTimeout(timer)
        timer = setTimeout(() => { pos = 0 }, 3000)

        if (pos === KONAMI.length) {
          pos = 0
          clearTimeout(timer)
          setIsGameMode(prev => !prev)
        }
      } else {
        pos = 0
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    return handleKonami()
  }, [handleKonami])

  return (
    <GameModeContext.Provider value={{ isGameMode, setIsGameMode }}>
      {children}
    </GameModeContext.Provider>
  )
}

export const useGameMode = () => useContext(GameModeContext)
