import { FormControl, FormLabel, Input, InputGroup, InputRightAddon } from '@chakra-ui/react'
import React from 'react'

const RightTextNumberInput = ({props}) => {
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
                    <InputRightAddon children={props.textIcon} />
                </InputGroup>
            </FormControl>
        </>
    )
}

export default RightTextNumberInput
