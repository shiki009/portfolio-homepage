import Link from 'next/link';
import Image from 'next/image';
import { Text, useColorModeValue } from '@chakra-ui/react';
import styled from '@emotion/styled';

const LogoBox = styled.span`
  font-weight: bold;
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  height: 30px;
  line-height: 20px;
  padding: 10px;
  img {
    transition: 200ms ease;
  }
  &:hover img {
    transform: rotate(20deg);
  }
`

const Logo = () => {
  const footPrintImg = `/images/logo.jpg`

  return (
    <Link href="/">
      <LogoBox>
        <Image src={footPrintImg} width={20} height={20} alt="Vladislav Šikirjavõi — home" />
        <Text
          color={useColorModeValue('gray.800', 'whiteAlpha.900')}
          fontFamily="'Rationale', sans-serif"
          fontWeight="bold"
          ml={3}
        >
          Vladislav Šikirjavõi
        </Text>
      </LogoBox>
    </Link>
  )
}

export default Logo;