import { InputGroup, Input, InputLeftElement } from '@chakra-ui/react';
import { FieldValue, UseFormRegister } from 'react-hook-form';
import { IoSpeedometerOutline } from 'react-icons/io5';

import InputMask from "react-input-mask";

export const OdometerReader = ({ register }) => {

  return (
    <InputGroup>
      <Input
        type={'number'}
        placeholder='Type here'
        _placeholder={{ opacity: 0.5, color: 'inherit' }}
        paddingLeft={14}
        size='lg'
        focusBorderColor='green.light'
        bg='cardBg.dark'
        color='white'
        border='InactiveBorder'
        isRequired={true}
        textAlign='left'
        name='current_kilometers'
        {...register('current_kilometers')}
      />

      <InputLeftElement
        w='4.5rem'
        h='100%'
        className="InputLeft"
        pointerEvents="none"
      >
        <IoSpeedometerOutline color='white' size={24} />
      </InputLeftElement>
    </InputGroup>
  )
}
