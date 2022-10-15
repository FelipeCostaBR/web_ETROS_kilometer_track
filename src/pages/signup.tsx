import {
  Flex,
  Text,
  Stack,
  Input,
  Box,
  Button,
  Link,
  Center,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Container
} from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react';
import { Header } from "../components/Header";
import { useAuth } from '../hooks/auth';

import api from '../services/api';

import {
  OptionBase,
  GroupBase,
  Select,
  Props,
} from "chakra-react-select";
import { useController, UseControllerProps, useForm } from 'react-hook-form';
import Router from 'next/router';

interface IVehicle extends OptionBase {
  id: string;
  vehicle: string;
  model: string;
  registration: string;
}

interface SignUpFormData {
  name: string;
  email: string;
  date_birth: Date;
  phone: number;
  vehicle_id: { value: string }
}

interface VehicleGroup extends OptionBase {
  value: string;
  label: string;
}
interface FormValues {
  vehicle: VehicleGroup | null;
}

type ControlledSelectProps = UseControllerProps<FormValues> &
  Props & {
    label: string;
  };

const ControlledSelect = ({
  control,
  name,
  id,
  label,
  rules,
  ...props
}: ControlledSelectProps) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error }
  } = useController<FormValues>({
    name,
    control,
    rules
  });

  return (
    <FormControl py={4} isInvalid={!!error} id={id}>
      <FormLabel>{label}</FormLabel>

      <Select
        name={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        {...props}
      />

      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
};

export default function Signup() {
  const { register, handleSubmit, control, formState } = useForm();
  const { signUp, signIn } = useAuth();

  const [vehicle, setVehicle] = useState<[IVehicle]>()

  const handleSignUp = useCallback(
    async (userInput: SignUpFormData) => {
      await new Promise(resolve => setTimeout(resolve, 500));

      const response = await signUp({
        name: userInput.name,
        email: userInput.email,
        date_birth: userInput.date_birth,
        phone: userInput.phone,
        vehicle_id: userInput.vehicle_id.value
      });

      if (response.status === 201) {
        const user_id = await signIn({ email: userInput.email, date_birth: userInput.date_birth });

        Router.push(`/dashboard/${user_id}`)
      }
    },
    [signIn, signUp],
  )

  useEffect(() => {
    const getVehicle = async () => {
      const response = await api.get('vehicles');
      const vehicles = response.data.map((vehicle: IVehicle) => (
        {
          value: vehicle.id,
          label: `${vehicle.vehicle} ${vehicle.model} - ${vehicle.registration}`
        }
      ))
      setVehicle(vehicles)
    }
    getVehicle()
  }, [])


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
        onSubmit={handleSubmit(handleSignUp)}
      >
        <Box w='70%'>
          <Stack spacing={0}>
            <Text>Name</Text>
            <Input
              name='name'
              type='text'
              placeholder='name'
              size='lg'
              bgColor='white'
              color='blackAlpha.900'
              isRequired={true}
              focusBorderColor='green.light'
              {...register('name')}
            />
          </Stack>

          <Stack spacing={0} mt={5}>
            <Text>Email Address</Text>
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
            <Text>Email Address</Text>
            <Input
              name='phone'
              type='number'
              placeholder='Phone'
              size='lg'
              bgColor='white'
              color='blackAlpha.900'
              isRequired={true}
              focusBorderColor='green.light'
              {...register('phone')}
            />
          </Stack>

          <Stack spacing={0} mt={5}>
            <Text>Date of Birth</Text>
            <Input
              name='date_birth'
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
              {...register('date_birth')}
            />
          </Stack>

          <Box mt={3}>
            <ControlledSelect
              control={control}
              name="vehicle_id"
              id="vehicle_id"
              options={vehicle}
              placeholder="Select Vehicle"
              size='lg'
              focusBorderColor='green.light'

              chakraStyles={{
                container: (provided) => ({
                  ...provided,
                  bg: 'white',
                  color: 'blackAlpha.900'
                }),
                dropdownIndicator: (provided) => ({
                  ...provided,
                  bg: "transparent",
                  px: 2,
                  cursor: "inherit",
                  color: 'blackAlpha.900'
                }),
                indicatorSeparator: (provided) => ({
                  ...provided,
                  display: 'none'
                }),
                option: (provided) => ({
                  ...provided,
                  borderBottom: '1px',
                  borderColor: 'blackAlpha.400'
                }),
                menuList: (provided) => ({
                  ...provided,
                  margin: '0 auto',
                  padding: '0px'
                }),
              }}
            />
          </Box>

          <Stack spacing={2}>
            <Button
              isLoading={formState.isSubmitting}
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
      </Flex >
    </Flex >
  )
}
