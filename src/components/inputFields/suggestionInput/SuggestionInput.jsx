import React, { useEffect, useState } from 'react';
import styles from './suggestioninput.module.css';
import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react';

const SuggestionInput = ({ props }) => {
    const [showSuggestion, setShowSuggestion] = useState(false);
    const [filteredData, setFilteredData] = useState([]);

    const onChange = (e) => {
        props.setCredentials({ ...props.credentials, [props.name]: e.target.value });

        if (e.target.value.trim().length === 0) {
            setShowSuggestion(false);
            return;
        }

        let filteredData = props.data.filter(item => item.value.toLowerCase().startsWith(e.target.value.trim().toLowerCase()));

        if (filteredData.length !== 0) {
            setFilteredData(filteredData);
            setShowSuggestion(true)
        } else {
            setFilteredData([]);
            setShowSuggestion(false)
        }
    }

    const selectSuggestion = (selectedValue) => {
        props.setCredentials({ ...props.credentials, [props.name]: selectedValue })
        setShowSuggestion(false);
    }

    useEffect(() => {
        setFilteredData(props.data)
    }, [])

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
                            value={props.value}
                            autoComplete='off'
                        />

                        {showSuggestion &&
                            <Box className={styles.custom_suggestion_box}>
                                {filteredData.map((data, index) => (
                                    <Box
                                        key={index}
                                        className={styles.custom_suggestion_element}
                                        onClick={() => selectSuggestion(data.value)}
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
