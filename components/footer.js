import { Box } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box align="center" opacity={0.4} fontSize="sm">
      &copy; {new Date().getFullYear()} Vladislav Šikirjavõi. All Rights Reserved.
      <Box fontSize="xs" mt={1}>
        Last updated February 2026
      </Box>
    </Box>
  )
}

export default Footer;