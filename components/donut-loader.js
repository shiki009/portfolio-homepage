import { forwardRef } from 'react'
import { Box, Spinner } from '@chakra-ui/react'

export const DonutSpinner = () => (
  <Spinner
    size="xl"
    position="absolute"
    left="50%"
    top="50%"
    ml="calc(0px - var(--spinner-size) / 2)"
    mt="calc(0px - var(--spinner-size))"
  />
)

export const DonutContainer = forwardRef(({ children }, ref) => (
  <Box
    ref={ref}
    className="donut"
    m="auto"
    mt={['-20px', '-60px', '-120px']}
    mb={['-40px', '-140px', '-200px']}
    w={[280, 480, 640]}
    h={[280, 480, 640]}
    position="relative"
  >
    {children}
  </Box>
))

const Loader = () => {
  return (
    <DonutContainer>
      <DonutSpinner />
    </DonutContainer>
  )
}

export default Loader