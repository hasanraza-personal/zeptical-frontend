import { FormControl, FormLabel, Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React from 'react'
import { Link45deg } from 'react-bootstrap-icons'

const LinkInput = ({ props }) => {
    return (
        <>
            <FormControl isRequired={props.isRequired}>
                <FormLabel mb={0}>{props.label}</FormLabel>
                <InputGroup>
                    <InputLeftElement>
                        <Icon as={Link45deg} />
                    </InputLeftElement>
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
