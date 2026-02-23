import { useRef, useEffect, useState, useCallback } from 'react'
import { Box, useDisclosure } from '@chakra-ui/react'
import { useGameMode } from '../../lib/gameContext'
import PortalOverlay from './overlay/PortalOverlay'
import TouchControls from './controls/TouchControls'

const GameMode = () => {
  const canvasRef = useRef(null)
  const engineRef = useRef(null)
  const { setIsGameMode } = useGameMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [activePortal, setActivePortal] = useState(null)

  const handlePortalEnter = useCallback((portalId) => {
    setActivePortal(portalId)
    onOpen()
  }, [onOpen])

  const handleExit = useCallback(() => {
    setIsGameMode(false)
  }, [setIsGameMode])

  const handleOverlayClose = useCallback(() => {
    const closedPortalId = activePortal
    onClose()
    setActivePortal(null)
    if (engineRef.current) {
      engineRef.current.resume(closedPortalId)
    }
  }, [onClose, activePortal])

  const handleTouchDirection = useCallback((dir) => {
    if (engineRef.current) {
      engineRef.current.setTouchDirection(dir)
    }
  }, [])

  useEffect(() => {
    let engine = null

    const init = async () => {
      const { default: GameEngine } = await import('./engine/GameEngine')
      if (!canvasRef.current) return

      engine = new GameEngine(canvasRef.current, {
        onPortalEnter: handlePortalEnter,
        onExit: handleExit,
      })
      engineRef.current = engine
      engine.start()
    }

    init()

    return () => {
      if (engine) engine.stop()
      engineRef.current = null
    }
  }, [handlePortalEnter, handleExit])

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minH="60vh"
      position="relative"
    >
      <Box
        as="canvas"
        ref={canvasRef}
        sx={{
          imageRendering: 'pixelated',
          maxWidth: '100%',
          height: 'auto',
          border: '2px solid',
          borderColor: 'whiteAlpha.300',
          borderRadius: 'md',
        }}
        width={640}
        height={480}
      />

      <TouchControls onDirectionChange={handleTouchDirection} />

      <PortalOverlay
        portalId={activePortal}
        isOpen={isOpen}
        onClose={handleOverlayClose}
      />
    </Box>
  )
}

export default GameMode
