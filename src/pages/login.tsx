import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import Router from 'next/router';
import { Flex, Box, Stack, Input, Text, Button, Link, FormLabel } from '@chakra-ui/react';

import { Header } from '../components/Header';
import { useAuth } from '../hooks/auth';
interface SignInFormData {
  email: string;
  date_birth: Date;
}

export default function Login() {
  const { register, handleSubmit, formState } = useForm();
  const { signIn } = useAuth();

  const handleLoginIn = useCallback(
    async (userInput: SignInFormData) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      const user_id = await signIn({ email: userInput.email, date_birth: userInput.date_birth });
      Router.push(`/dashboard/${user_id}`)
    },
    [signIn],
  )

  return (
    <Flex
      w='100vw'
      h='100vh'
      align='center'
      flexDir={'column'}
    >
      <Header />
      <Box
        as='form'
        mt={16}
        w='70%'
        maxW='350px'
        onSubmit={handleSubmit(handleLoginIn)}
      >
        <Stack spacing={0}>
          <FormLabel htmlFor='email' m='0'>
            E-mail
          </FormLabel>
          <Input
            name='email'
            type='email'
            placeholder='e-mail'

            size='lg'
            bgColor='white'
            color='blackAlpha.900'
            isRequired={true}
            focusBorderColor='green.light'
            {...register('email')}
          />
        </Stack>

        <Stack spacing={0} mt={5}>
          <FormLabel htmlFor='date_birth' m='0'>
            Date of Birth
          </FormLabel>
          <Input
            name='date_birth'
            type="date"
            placeholder={'date of birth'}
            css={` ::-webkit-calendar-picker-indicator {
                      background: url(https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/calendar-16.png) center/90% no-repeat;
                                      }
                     ::-webkit-datetime-edit { color: #718096 }
                  `}

            size='lg'
            bgColor='white'
            color='blackAlpha.900'
            isRequired={true}
            focusBorderColor='green.light'

            {...register('date_birth')}
          />
        </Stack>
        <Box mt='32px'>
          <Text textAlign='right'>Forgot Password?</Text>
        </Box>

        <Link href='/dashboard'>
          <Button
            isLoading={formState.isSubmitting}
            type={'submit'}
            w='100%'
            colorScheme="green"
            size={'lg'}
            mt='62px'
          >
            Login
          </Button>
        </Link>
      </Box>
    </Flex >
  )
}

