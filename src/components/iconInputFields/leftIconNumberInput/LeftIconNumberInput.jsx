import { FormControl, FormLabel, Icon, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import React from 'react'

const LeftIconNumberInput = ({ props }) => {
    return (
        <>
            <FormControl isRequired={props.isRequired}>
                <FormLabel mb={0}>{props.label}</FormLabel>
                <InputGroup>
                    <InputLeftAddon children={
                        <Icon as={props.icon} color='gray.600' />
                    } />
                    <Input
                        type='number'
                        name={props.name}
                        placeholder={props.placeholder}
                        value={props.value}
                        onChange={props.onChange}
                        className='input-focus'
                    />
                </InputGroup>
            </FormControl>
        </>
    )
}

export default LeftIconNumberInput
