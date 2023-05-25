import { FormControl, FormLabel, Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { CurrencyRupee } from 'react-bootstrap-icons';

const MoneyInput = ({ props }) => {
    return (
        <>
            <FormControl isRequired={props.isRequired}>
                <FormLabel mb={0}>{props.label}</FormLabel>
                <InputGroup>
                    <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                            <Icon as={CurrencyRupee} color='gray.600' />
                        </InputLeftElement>
                        <Input
                            type='number'
                            name={props.name}
                            placeholder={props.placeholder}
                            value={props.value}
                            onChange={props.onChange}
                            className='input-focus'
                        />
                    </InputGroup>

                    {/* <InputLeftAddon children='₹' />
                    <NumberInput defaultValue={props.value === "" ? 15 : props.value} w='100%'>
                        <NumberInputField
                            name={props.name}
                            placeholder={props.placeholder}
                            value={props.value}
                            onChange={props.onChange}
                            className='input-focus'
                        />
                    </NumberInput> */}
                </InputGroup>
            </FormControl>
        </>
    )
}

export default MoneyInput
