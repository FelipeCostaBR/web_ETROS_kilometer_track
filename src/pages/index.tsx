import { Flex, Stack, Button, Divider, Box, Link } from '@chakra-ui/react';

import { Header } from '../components/Header';

export default function Home() {
  return (
    <Flex
      w='100vw'
      h='100vh'
      align='center'
      flexDir={'column'}
    >
      <Header />

      <Flex
        w='100vw'
        h='70vh'
        align='center'
        justify='center'
      >
        <Stack
          spacing={5}
          w='280px'
          align='center'
        >
          <Link href='/login'>
            <Button
              w='200px'
              colorScheme="green"
              size={'lg'}
            >
              Login
            </Button>
          </Link>
          <Divider borderWidth={1} />

          <Link href='/signup'>
            <Button
              w='200px'
              colorScheme='black'
              size={'lg'}
              variant='outline'
            >
              Sign up
            </Button>
          </Link>
        </Stack>
      </Flex>
    </Flex >
  )
}
