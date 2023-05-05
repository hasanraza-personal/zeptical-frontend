import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'

const TextInput = ({ props }) => {
    return (
        <>
            <FormControl isRequired={props.isRequired}>
                <FormLabel m={0}>{props.label}</FormLabel>
                <Input
                    type='text'
                    name={props.name}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                    className='input-focus'
                />
            </FormControl>
        </>
    )
}

export default TextInput
