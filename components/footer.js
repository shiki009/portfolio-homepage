import { Box, useColorModeValue } from '@chakra-ui/react';

const Footer = () => {
  const hintColor = useColorModeValue('#f0e7db', '#202023')

  return (
    <Box align="center" opacity={0.4} fontSize="sm">
      &copy; {new Date().getFullYear()} Vladislav Šikirjavõi. All Rights Reserved.
      <Box fontSize="xs" mt={1}>
        Last updated February 2026
      </Box>
      <Box
        fontSize="9px"
        mt={3}
        letterSpacing="2px"
        color={hintColor}
        transition="color 0.8s ease"
        _hover={{ color: 'gray.500' }}
        cursor="default"
        userSelect="none"
        aria-hidden="true"
      >
        ↑↑↓↓←→←→BA
      </Box>
    </Box>
  )
}

export default Footer;
