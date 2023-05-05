import { FormControl, FormLabel, Icon, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import React from 'react';
import { Eye, EyeSlash } from 'react-bootstrap-icons';

const PasswordInput = ({ props }) => {
    const [show, setShow] = React.useState(false)

    return (
        <>
            <FormControl isRequired={props.isRequired}>
                <FormLabel mb={0}>{props.label}</FormLabel>
                <InputGroup size='md'>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        name={props.name}
                        placeholder={props.placeholder}
                        value={props.value}
                        onChange={props.onChange}
                        className='input-focus'
                    />
                    <InputRightElement width='4.5rem'>
                        <Icon as={show ? EyeSlash : Eye} fontSize={22} onClick={() => { setShow(!show) }} />
                    </InputRightElement>
                </InputGroup>
            </FormControl>
        </>
    )
}

export default PasswordInput
