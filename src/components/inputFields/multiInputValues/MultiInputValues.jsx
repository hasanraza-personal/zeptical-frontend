import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Tag, TagCloseButton, TagLabel, useToast } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import styles from './multiinputvalues.module.css';

const MultiInputValues = ({ props }) => {
    const toast = useToast();
    const valueRef = useRef([]);
    const inputRef = useRef(null);
    // eslint-disable-next-line
    const [dataExist, setDataExist] = useState(false);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleAdd();
        }
    }

    const handleAdd = () => {
        if (inputRef.current.value.length === 0) {
            toast({
                position: 'top',
                title: "Field cannot be empty",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        if (valueRef.current.length !== 0) {
            const foundIndex = valueRef.current.findIndex(element => element.trim().toLowerCase() === props.value.trim().toLowerCase());

            if (foundIndex !== -1) {
                toast({
                    position: 'top',
                    title: "Data already exist",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }
        }
        valueRef.current.push(props.value);

        const syntheticEvent = {
            target: {
                name: props.name,
                value: valueRef.current,
            },
        };
        props.onChange(syntheticEvent);
        inputRef.current.value = '';
    }

    const handleRemove = (index) => {
        valueRef.current.splice(index, 1);

        const syntheticEvent = {
            target: {
                name: props.name,
                value: valueRef.current,
            },
        };
        props.onChange(syntheticEvent);
    }

    useEffect(() => {
        valueRef.current = props.value;
        if (valueRef.current.length !== 0) {
            setDataExist(true)
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (typeof props.value === 'string' && props.value.length === 0) {
            const syntheticEvent = {
                target: {
                    name: props.name,
                    value: valueRef.current,
                },
            };
            props.onChange(syntheticEvent);
        }
        // eslint-disable-next-line
    }, [props.onChange])

    return (
        <>
            <Box>
                <FormControl isRequired={props.isRequired}>
                    <FormLabel m={0}>{props.label}</FormLabel>
                    <InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            type='text'
                            placeholder={props.placeholder}
                            ref={inputRef}
                            name={props.name}
                            onChange={props.onChange}
                            onKeyPress={handleKeyPress}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button className='zeptical-red-fill-button' h='1.75rem' size='sm' onClick={() => handleAdd()}>
                                Add
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>

                <Box mt={1}>
                    {valueRef.current.map((item, index) => (
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
            </Box>

        </>
    )
}

export default MultiInputValues
