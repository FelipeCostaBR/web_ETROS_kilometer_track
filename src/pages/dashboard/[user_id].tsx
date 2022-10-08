import { Box, Text, Flex, Button, Stack } from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card } from '../../components/Card';
import { Header } from '../../components/Header';
import { OdometerReader } from '../../components/OdometerReader';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface IUser extends AxiosResponse {
  id: string;
  name: string;
  email: string;
  date_birth: Date;
  phone: number;
  created_at: Date;
  updated_at: Date;
}

interface IVehicle {
  id: string;
  user_id: string;
  vehicle: string;
  model: string;
  year: string;
  transmission: string;
  registration: string;
  current_kilometers: number;
  next_km_to_service: number;
  next_service: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export default function Dashboard() {
  useAuth
  const { user_id } = useRouter().query

  const [user, setUser] = useState<IUser>({} as IUser)
  const [vehicle, setVehicle] = useState<IVehicle>({} as IVehicle)
  const { register, handleSubmit, formState } = useForm();


  const handleOdometerUpdate = async (userInput: IVehicle) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    await api.put(`/vehicles/user/${user_id}`, userInput
    )
  }

  useEffect(() => {
    const storage_user = localStorage.getItem('@ETROS_KILOMETER:user');
    const data = JSON.parse(storage_user);
    setUser(data)

    api.get(`vehicles/user/${user_id}`).then((vehicle) => (setVehicle(vehicle.data)))
  }, [user_id])

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
        onSubmit={handleSubmit(handleOdometerUpdate)}
      >
        <Stack
          spacing={4}
          mt='60px'
          textAlign={'center'}
        >
          <Text fontSize='2xl'>Hi {user.name}</Text>
          <Text fontSize='2xl' >Thank you for choosing Etros!</Text>
        </Stack>

        <Stack spacing={6}>
          <Card user={user}>Your Details</Card>
          <Card vehicle={vehicle}>Vehicle Details</Card>

        </Stack>

        <Stack
          w='100%'
          spacing={7}
          mt={4}
        >
          <Text mt={16} fontSize='xl'>Please, insert the odometer reader:</Text>
          <OdometerReader register={register} />
          <Button
            isLoading={formState.isSubmitting}
            type={'submit'}
            w='100%'
            colorScheme="green"
            size={'lg'}
            mt='50px'
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </Flex >
  )
}
