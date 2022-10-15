import { Box, Text, Flex, Collapse, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io';
import { formatDate } from '../helper/formatDate';

interface IUser {
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

interface DataInfos {
  children: string;
  user?: IUser;
  vehicle?: IVehicle;
  openCard: boolean;
}

export const Card = ({ children, user, vehicle, openCard }: DataInfos) => {
  const [isOpen, setIsOpen] = useState(openCard)
  const handleTransition = () => setIsOpen(!isOpen)

  return (
    <Box
      p={7}
      mt={7}
      borderRadius='4px'
      bg='cardBg.dark'
    >
      <Flex justify='space-between' onClick={handleTransition}>
        <Text
          color='white'
          fontSize='xl'
          fontWeight='bold'
          textAlign='left'
        >
          {children}
        </Text>
        <Flex align='center'>
          {isOpen ? <IoIosArrowDown size={20} color='white' /> : <IoIosArrowBack size={20} color='white' />}
        </Flex>
      </Flex>

      <Collapse
        in={isOpen}
        startingHeight={0}
        style={{ display: 'block' }} animateOpacity
      >
        <Flex
          marginRight='2'
          mt='9'
          rounded='md'

        >
          <Stack
            spacing={3}
            mb={5}
            w='100%'
          >
            {user ?
              <>
                <Text variant={{ base: 'card' }}>
                  <strong>{'Name'}:</strong> {user.name}
                </Text>

                <Text variant={{ base: 'card' }}>
                  <strong>{'Email'}:</strong> {user.email}
                </Text>

                <Text variant={{ base: 'card' }}>
                  <strong>{'Phone'}:</strong> {user.phone}
                </Text>
              </>

              :
              <>
                <Text variant={{ base: 'card' }}>
                  <strong>{'Vehicle'}:</strong> {vehicle.vehicle} {vehicle.model}
                </Text>

                <Text variant={{ base: 'card' }}>
                  <strong>{'Year'}:</strong> {vehicle.year}
                </Text>

                <Text variant={{ base: 'card' }}>
                  <strong>{'Registration'}:</strong> {vehicle.registration}
                </Text>

                <Text variant={{ base: 'card' }}>
                  <strong>{'Current kilometers'}:</strong> {vehicle.current_kilometers} km
                </Text>

                <Text fontWeight={'bold'}>The vehicle needs service when it reach:</Text>

                <Text variant={{ base: 'card' }}>
                  <strong>{'Kilometers'}:</strong> {vehicle.next_km_to_service} km
                </Text>

                <Text variant={{ base: 'card' }}>
                  <strong>{'Date'}:</strong> {formatDate(vehicle.next_service)}
                </Text>


              </>
            }
          </Stack>
        </Flex>

      </Collapse>


    </Box >
  )
}