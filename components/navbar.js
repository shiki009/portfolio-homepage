import Logo from './logo';
import NextLink from 'next/link';

import {
    Container,
    Box,
    Link,
    Stack,
    Heading,
    Flex,
    Menu,
    MenuItem,
    MenuList,
    MenuButton,
    IconButton,
    useColorModeValue,
} from '@chakra-ui/react';

import ThemeToggleButton from './theme-toggle-button'

import {HumburgerIcon} from '@chakra-ui/icons';
import { IoLogoGithub } from 'react-icons/io5';

const LinkItem = ({ href, path, _target, children, ...props }) => {
    const active = path === href
    const inactiveColor = useColorModeValue('gray200', 'whiteAlpha.900')
    return (
      <NextLink href={href} passHref>
        <Link
          p={2}
          bg={active ? 'grassTeal' : undefined}
          color={active ? '#202023' : inactiveColor}
          _target={_target}
          {...props}
        >
          {children}
        </Link>
      </NextLink>
    )
}

const Navbar = props => {
    const {path} = props;

    return (
        <Box
            position="fixed"
            as="nav"
            w="100%"
            bg={useColorModeValue('#ffffff40', '#20202380')}
            css={{ backdropFilter: 'blur(10px)' }}
            zIndex={1}
            {...props}
        >
            <Container
              display="flex"
              p={2}
              maxW="container.md"
              wrap="wrap"
              align="center"
              justify="space-between"
            >
              <Flex align="center" mr={5}>
                <Heading as="h1" size="lg" letterSpacing={'tighter'}>
                  <Logo />
                </Heading>
              </Flex>

              <Stack
                direction={{ base: 'column', md: 'row' }}
                display={{ base: 'none', md: 'flex' }}
                width={{ base: 'full', md: 'auto' }}
                alignItems="center"
                flexGrow={1}
                mt={{ base: 4, md: 0 }}
              >
              </Stack>

              <ThemeToggleButton />

            </Container>
        </Box>
    )
}

export default Navbar;
