import React, { useEffect, useState } from 'react';
import styles from './multisuggestioninputvalues.module.css';
import { Box, FormControl, FormLabel, Input, InputGroup, InputRightElement, Tag, TagCloseButton, TagLabel, useToast } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons'
import { v4 as uuidv4 } from 'uuid';

const MultiSuggestInputValues = ({ props }) => {
    const toast = useToast();
    const id = uuidv4();
    const [showSuggestion, setShowSuggestion] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const onChange = (e) => {
        setInputValue(e.target.value);

        if (e.target.value.trim().length === 0) {
            setShowSuggestion(false);
            return;
        }

        let filteredData = props.data.filter(item => item.value.toLowerCase().startsWith(e.target.value.trim().toLowerCase()));
        
        if (filteredData.length === 1 && filteredData[0].value.trim().toLowerCase() === e.target.value.trim().toLowerCase()) {
            setFilteredData([...filteredData])
        } else {
            setFilteredData([{ id: 1, value: e.target.value }, ...filteredData])
        }
        setShowSuggestion(true)
    }

    const selectSuggestion = async (selectedValue) => {
        if (selectedValue.trim().length !== 0) {
            const foundIndex = props.value.findIndex(element => element.trim().toLowerCase() === selectedValue.trim().toLowerCase());

            if (foundIndex !== -1) {
                if (!toast.isActive(id)) {
                    toast({
                        id,
                        position: 'top',
                        title: `${props.name} already exist`,
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });
                }
                return;
            }
        }
        props.setCredentials({ ...props.credentials, [props.name]: [...props.value, selectedValue] })
        props.setSelectedSuggestion(selectedValue);
        setShowSuggestion(false);
        setInputValue("");
    }

    const handleRemove = (index) => {
        let newArr = props.value;
        newArr.splice(index, 1)

        props.setCredentials({ ...props.credentials, [props.name]: newArr })
    }

    const handleClear = () => {
        setInputValue("");
        setShowSuggestion(false);
    }

    useEffect(() => {
        setFilteredData(props.data)
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Box>
                <FormControl isRequired={props.isRequired}>
                    <FormLabel m={0}>{props.label}</FormLabel>

                    <Box>
                        <InputGroup>
                            <Input
                                type='text'
                                placeholder={props.placeholder}
                                onChange={onChange}
                                value={inputValue}
                            />
                            {showSuggestion &&
                                <InputRightElement onClick={handleClear} cursor='pointer'>
                                    <CloseIcon w={3} h={3} color='gray.500' />
                                </InputRightElement>
                            }
                        </InputGroup>

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

                <Box mt={1}>
                    {props.value.map((item, index) => (
                        <Tag
                            size='lg'
                            key={index}
                            borderRadius='full'
                            variant='solid'
                            className={styles.tag}
                        >
                            <TagLabel>{item}</TagLabel>
                            <TagCloseButton onClick={() => handleRemove(index)} />
                        </Tag>
                    ))}
                </Box>
            </Box >
        </>
    )
}

export default MultiSuggestInputValues
