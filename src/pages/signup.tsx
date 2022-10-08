import { Flex, Text, Stack, Input, Box, Button, Link, Center } from '@chakra-ui/react'
import { Header } from "../components/Header";
import { PasswordInput } from '../components/PasswordInput';

export default function Signup() {
  return (
    <Flex
      w='100vw'
      h='100vh'
      align='center'
      flexDir={'column'}
    >
      <Header />
      <Flex
        as={'form'}
        mt={16}
        w='100vw'
        align='center'
        justify='center'
      >
        <Box w='70%'>
          <Stack spacing={0}>
            <Text>Email Address</Text>
            <Input
              type='email'
              placeholder='e-mail'
              size='lg'
              bgColor='white'
              color='blackAlpha.900'
              isRequired={true}
              focusBorderColor='green.light'
            />
          </Stack>

          <Stack spacing={0} mt={5}>
            <Text>Password</Text>
            <PasswordInput />
          </Stack>

          <Stack spacing={0} mt={5}>
            <Text>Date of Birth</Text>
            <Input
              type="date"
              css={` ::-webkit-calendar-picker-indicator {
                      background: url(https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/calendar-16.png) center/90% no-repeat;
                                      }
                     ::-webkit-datetime-edit { color: #718096 }
                  `}

              _placeholder={{}}
              size='lg'
              bgColor='white'
              color='blackAlpha.900'
              isRequired={true}
              focusBorderColor='green.light'
            />
          </Stack>

          <Stack spacing={2}>
            <Button
              type={'submit'}
              w='100%'
              colorScheme="green"
              size={'lg'}
              mt='50px'
            >
              Sign up
            </Button>

            <Center>
              <Text>Already have an account?
                <Link href='/login'>
                  <Text fontWeight='bold' as='u'> Log in</Text>
                </Link>
              </Text>
            </Center>
          </Stack>

        </Box>

      </Flex>
    </Flex >
  )
}