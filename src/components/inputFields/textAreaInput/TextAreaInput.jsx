import { FormControl, FormLabel, Textarea } from '@chakra-ui/react';
import React from 'react';

const TextAreaInput = ({ props }) => {
    return (
        <>
            <FormControl isRequired={props.isRequired}>
                <FormLabel m={0}>{props.label}</FormLabel>
                <Textarea
                    name={props.name}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                    className='input-focus'
                    rows={5}
                />
            </FormControl>
        </>
    )
}

export default TextAreaInput
