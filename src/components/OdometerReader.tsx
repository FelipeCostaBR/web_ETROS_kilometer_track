import { InputLeftElement, NumberInput, NumberInputField } from '@chakra-ui/react';
import { IoSpeedometerOutline } from 'react-icons/io5';

export const OdometerReader = ({ register }) => {

  return (
    <NumberInput>
      <NumberInputField
        placeholder='Type here'
        _placeholder={{ opacity: 0.5, color: 'inherit' }}
        paddingLeft={14}
        size='lg'
        focusBorderColor='green.light'
        bg='cardBg.dark'
        color='white'
        border='InactiveBorder'
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
    </NumberInput>
  )
}
