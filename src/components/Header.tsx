import Image from 'next/image';
import { Box, Link } from '@chakra-ui/react';
import logo from '../asset/logo.png';

export const Header = () => {
  return (
    <Box
      as='header'
      w='350px'
      maxW='70%'
      mt='42px'
      paddingRight={5}
    >
      <Link href='/'>
        <Image
          src={logo}
          alt="ETROS Logo"
          layout='responsive'

        />
      </Link>
    </Box >
  )
}
