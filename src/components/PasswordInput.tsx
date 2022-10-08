import { useState } from "react";
import { InputGroup, Input, InputRightElement, Button } from '@chakra-ui/react'


export const PasswordInput = () => {
  const [show, setShow] = useState(false)

  return (
    <InputGroup size='md'>
      <Input
        size='lg'
        bgColor='white'
        color='blackAlpha.900'
        isRequired={true}
        type={show ? 'text' : 'password'}
        placeholder='Enter password'
        focusBorderColor='green.light'
      />
      <InputRightElement w='4.5rem' h='100%' >
        <Button h='1.75rem' size='sm' onClick={() => setShow(!show)} color={'black'} bgColor='gray.300'>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}