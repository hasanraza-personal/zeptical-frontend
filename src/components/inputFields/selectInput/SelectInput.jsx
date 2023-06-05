import { FormControl, FormLabel, Select } from '@chakra-ui/react'
import React from 'react'

const SelectInput = ({ props }) => {
    return (
        <>
            <FormControl isRequired={props.isRequired}>
                <FormLabel m={0}>{props.label}</FormLabel>
                <Select
                    name={props.name}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                    className='input-focus'
                >
                    {props.options.map((option, index) => (
                        <option key={index} value={option.value} >{option.label}</option>
                    ))}

                </Select>
            </FormControl>
        </>
    )
}

export default SelectInput
