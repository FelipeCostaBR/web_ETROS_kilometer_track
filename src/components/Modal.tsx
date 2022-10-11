import {
  Button,
  Text,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  UseDisclosureProps
} from "@chakra-ui/react";
import { FieldValues, FormState, useForm, UseFormGetValues, UseFormHandleSubmit } from "react-hook-form";
import { IoSpeedometerOutline } from "react-icons/io5";
import { formatKilometer } from "../helper/formatKilometer";
import api from "../services/api";

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

interface ISubmitModal {
  isOpen: boolean;
  onClose: () => void;
  id: String | String[];
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  formState: FormState<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
}

export default function SubmitModal({ isOpen, onClose, id, handleSubmit, formState, getValues }: ISubmitModal) {

  const handleOdometerUpdate = async (userInput: IVehicle) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (isOpen) {
      const res = await api.put(`/vehicles/user/${id}`, userInput)
      onClose
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={'xs'}
      isCentered>
      <ModalOverlay
      />
      <ModalContent
        bg='cardBg.dark'
        paddingY={10}
        paddingX={3}
      >
        <ModalHeader
          fontSize={'xl'}
        >
          Please, confirm below if the kilometers is correct
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          as='form'
          onSubmit={handleSubmit(handleOdometerUpdate)}
        >
          <Flex alignItems={'center'}>
            <IoSpeedometerOutline color='white' size={24} />
            <Text pl={2} fontSize='2xl' align={'center'} fontWeight={'bold'}>
              {formatKilometer(getValues("current_kilometers"))}
            </Text>
          </Flex>
          <Button
            isLoading={formState.isSubmitting}
            type={'submit'}
            onClick={onClose}
            w='100%'
            colorScheme="green"
            size={'lg'}
            mt='50px'
          >
            Submit
          </Button>

        </ModalBody>
      </ModalContent>
    </Modal>
  )
}