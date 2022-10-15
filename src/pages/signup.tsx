import { Flex, Text, Stack, Input, Box, Button, Link, Center } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { Header } from "../components/Header";
import api from '../services/api';

import {
  OptionBase,
  GroupBase,
  Select,
} from "chakra-react-select";

interface IVehicle extends OptionBase {
  id: string;
  vehicle: string;
  model: string;
  registration: string;
}

export default function Signup() {
  const [vehicle, setVehicle] = useState<[IVehicle]>()

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
      >
        <Box w='70%'>
          <Stack spacing={0}>
            <Text>Name</Text>
            <Input
              type='text'
              placeholder='name'
              size='lg'
              bgColor='white'
              color='blackAlpha.900'
              isRequired={true}
              focusBorderColor='green.light'
            />
          </Stack>

          <Stack spacing={0} mt={5}>
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

          <Box mt={6}>

            <Select<IVehicle, false, GroupBase<IVehicle>>
              name="vehicles"
              className="chakra-react-select"
              classNamePrefix="chakra-react-select"
              options={vehicle}
              placeholder="Select Vehicle"
              selectedOptionStyle="check"
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
