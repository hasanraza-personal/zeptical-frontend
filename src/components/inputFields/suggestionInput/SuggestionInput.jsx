import React, { useRef, useState } from 'react';
import styles from './suggestioninput.module.css';
import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react';

const SuggestionInput = ({ props }) => {
    const filteredDataRef = useRef([]);
    const [inputValue, setInputValue] = useState(props.value);

    const onChange = (e) => {
        setInputValue(e.target.value);
        filteredDataRef.current = props.data.filter(item => item.value.toLowerCase().startsWith(e.target.value.trim().toLowerCase()));
    }

    const selectSuggestion = (selectedValue) => {
        setInputValue(selectedValue);
        props.setCredentials({ ...props.credentials, [props.name]: selectedValue });
        filteredDataRef.current = []
    }

    const handleSetValue = () => {
        setInputValue(inputValue);
        props.setCredentials({ ...props.credentials, [props.name]: inputValue });
    }

    return (
        <>
            <Box>
                <FormControl isRequired={props.isRequired}>
                    <FormLabel m={0}>{props.label}</FormLabel>

                    <Box>
                        <Input
                            type='text'
                            placeholder={props.placeholder}
                            name={props.name}
                            onChange={onChange}
                            value={inputValue}
                            autoComplete='off'
                            className='input-focus'
                            onBlur={handleSetValue}
                        />

                        {(filteredDataRef.current.length !== 0) &&
                            <Box className={styles.custom_suggestion_box}>
                                {filteredDataRef.current.map((data, index) => (
                                    <Box
                                        key={index}
                                        className={styles.custom_suggestion_element}
                                        onClick={() => selectSuggestion(data.value)}
                                        tabIndex={0}
                                    >
                                        {data.value}
                                    </Box>
                                ))}
                            </Box>
                        }
                    </Box>
                </FormControl>
            </Box >
        </>
    )
}

export default SuggestionInput
