import { Box, Text, Flex, Collapse, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io';

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
}

export const Card = ({ children, user, vehicle }: DataInfos) => {
  const [isOpen, setIsOpen] = useState(false)
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
                <Text
                  bg='white'
                  color='blackAlpha.900'
                  paddingX={3}
                  paddingY={1.5}
                  borderRadius='4px'
                >
                  <strong>{'Name'}:</strong> {user.name}
                </Text>
                <Text
                  bg='white'
                  color='blackAlpha.900'
                  paddingX={3}
                  paddingY={1.5}
                  borderRadius='4px'
                >
                  <strong>{'Email'}:</strong> {user.email}
                </Text>
                <Text
                  bg='white'
                  color='blackAlpha.900'
                  paddingX={3}
                  paddingY={1.5}
                  borderRadius='4px'
                >
                  <strong>{'Phone'}:</strong> {user.phone}
                </Text>
              </>

              :
              <>
                <Text
                  bg='white'
                  color='blackAlpha.900'
                  paddingX={3}
                  paddingY={1.5}
                  borderRadius='4px'
                >
                  <strong>{'Vehicle'}:</strong> {vehicle.vehicle}
                </Text>
                <Text
                  bg='white'
                  color='blackAlpha.900'
                  paddingX={3}
                  paddingY={1.5}
                  borderRadius='4px'
                >
                  <strong>{'Model'}:</strong> {vehicle.model}
                </Text>
                <Text
                  bg='white'
                  color='blackAlpha.900'
                  paddingX={3}
                  paddingY={1.5}
                  borderRadius='4px'
                >
                  <strong>{'Year'}:</strong> {vehicle.year}
                </Text>
                <Text
                  bg='white'
                  color='blackAlpha.900'
                  paddingX={3}
                  paddingY={1.5}
                  borderRadius='4px'
                >
                  <strong>{'Registration'}:</strong> {vehicle.registration}
                </Text>
              </>
            }
          </Stack>
        </Flex>

      </Collapse>


    </Box >
  )
}