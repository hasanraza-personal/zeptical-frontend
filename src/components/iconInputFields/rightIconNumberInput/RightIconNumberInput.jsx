import { FormControl, FormLabel, Icon, Input, InputGroup, InputRightAddon } from '@chakra-ui/react'
import React from 'react'

const RightIconNumberInput = ({ props }) => {
    return (
        <>
            <FormControl isRequired={props.isRequired}>
                <FormLabel mb={0}>{props.label}</FormLabel>
                <InputGroup>
                    <Input
                        type='number'
                        name={props.name}
                        placeholder={props.placeholder}
                        value={props.value}
                        onChange={props.onChange}
                        className='input-focus'
                    />
                    <InputRightAddon children={
                        <Icon as={props.icon} color='gray.600' />
                    } />
                </InputGroup>
            </FormControl>
        </>
    )
}

export default RightIconNumberInput
