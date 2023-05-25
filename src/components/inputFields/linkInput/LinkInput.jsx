import { FormControl, FormLabel, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import React from 'react'

const LinkInput = ({ props }) => {
    return (
        <>
            <FormControl isRequired={props.isRequired}>
                <FormLabel mb={0}>{props.label}</FormLabel>
                <InputGroup>
                    <InputLeftAddon children='https://' />
                    <Input
                        type='text'
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

export default LinkInput
