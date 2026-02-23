import { Box, IconButton } from '@chakra-ui/react'
import { DIRECTIONS } from '../engine/constants'

const DpadButton = ({ label, onPointerDown, onPointerUp, top, left, right, bottom }) => (
  <IconButton
    aria-label={label}
    position="absolute"
    top={top}
    left={left}
    right={right}
    bottom={bottom}
    w="50px"
    h="50px"
    minW="50px"
    borderRadius="md"
    bg="whiteAlpha.300"
    color="white"
    fontSize="xl"
    _active={{ bg: 'whiteAlpha.500' }}
    onPointerDown={onPointerDown}
    onPointerUp={onPointerUp}
    onPointerLeave={onPointerUp}
  >
    {label}
  </IconButton>
)

const TouchControls = ({ onDirectionChange }) => {
  const press = dir => () => onDirectionChange(dir)
  const release = () => onDirectionChange(null)

  return (
    <Box
      position="fixed"
      bottom="20px"
      left="20px"
      w="160px"
      h="160px"
      zIndex={10}
      display={{ base: 'block', md: 'none' }}
      sx={{ touchAction: 'none' }}
    >
      {/* D-pad */}
      <DpadButton label="▲" top="0" left="55px" onPointerDown={press(DIRECTIONS.UP)} onPointerUp={release} />
      <DpadButton label="◀" top="55px" left="0" onPointerDown={press(DIRECTIONS.LEFT)} onPointerUp={release} />
      <DpadButton label="▶" top="55px" right="0" onPointerDown={press(DIRECTIONS.RIGHT)} onPointerUp={release} />
      <DpadButton label="▼" bottom="0" left="55px" onPointerDown={press(DIRECTIONS.DOWN)} onPointerUp={release} />
    </Box>
  )
}

export default TouchControls
