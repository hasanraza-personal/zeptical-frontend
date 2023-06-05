import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Flex } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect } from 'react'

const PreviousUserData = ({ props }) => {
    let userDataArr = [
        {
            dataExist: props.location ? true : false,
            fieldName: "Location details",
            msg: props.location ? "Your location details are available." : "Please provide your location details.",
        },
        {
            dataExist: props.education ? true : false,
            fieldName: "Education details",
            msg: props.education ? "Your education details are available." : "Please provide your education details.",
        },
        {
            dataExist: props.skill.length !== 0 ? true : false,
            fieldName: "Your skills",
            msg: props.skill ? "You have provided your skills." : "Please provide your skills.",
        },
        {
            dataExist: props.project.length !== 0 ? true : false,
            fieldName: "projects details",
            msg: props.project ? "Your project details are available." : "Please provide your project details.",
        }
    ]

    useEffect(() => {

    }, [])

    return (
        <>
            <Flex flexDirection='column' gap={2} mt={4}>
                {userDataArr.map((data, index) => (
                    <Alert variant='left-accent' status={data.dataExist ? 'success' : 'error'} key={index} p='10px 15px' borderRadius={5}>
                        <AlertIcon />
                        <Box>
                            <AlertTitle>{data.fieldName}</AlertTitle>
                            <AlertDescription>{data.msg}</AlertDescription>
                        </Box>
                    </Alert>
                ))}
            </Flex>
        </>
    )
}

export default PreviousUserData
