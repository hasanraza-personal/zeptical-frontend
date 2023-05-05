import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'

const EmailInput = ({ props }) => {
    return (
        <>
            <FormControl isRequired={props.isRequired}>
                <FormLabel mb={0}>{props.label}</FormLabel>
                <Input
                    type='email'
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

export default EmailInput
