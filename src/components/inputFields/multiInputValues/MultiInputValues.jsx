import { Box, Button, Input, InputGroup, InputRightElement, useToast } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'

const MultiInputValues = ({ props }) => {
    const toast = useToast();
    const valueRef = useRef([]);
    const inputRef = useRef(null);

    const handleAddSkill = () => {
        if (props.value.length === 0) {
            console.log("Skill field cannot be empty");
        }

        if (valueRef.current.length !== 0) {
            const foundIndex = valueRef.current.findIndex(element => element.toLowerCase() === props.value.toLowerCase());

            if (foundIndex !== -1) {
                console.log("Skill already exist");
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

    }

    useEffect(() => {
        valueRef.current = props.value;
    }, [])

    return (
        <>
            <Box>
                <InputGroup size='md'>
                    <Input
                        pr='4.5rem'
                        type='text'
                        placeholder='eg. ReactJS'
                        ref={inputRef}
                        name={props.name}
                        onChange={props.onChange}
                        // value={props.value}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={() => handleAddSkill()}>
                            Add
                        </Button>
                    </InputRightElement>
                </InputGroup>

                {/* <Box mt={1}>
                    {props.value.map((item, key) => (
                        <Tag
                            size='lg'
                            key={key}
                            borderRadius='full'
                            variant='solid'
                            className='skill-tag'
                            fontFamily='Nunito-SemiBold'
                        >
                            <TagLabel>{item}</TagLabel>
                            <TagCloseButton onClick={() => handleRemoveSkill(props.index, key)} />
                        </Tag>
                    ))}
                </Box> */}
            </Box>

        </>
    )
}

export default MultiInputValues
