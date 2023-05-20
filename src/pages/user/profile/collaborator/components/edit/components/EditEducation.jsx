import { Box, Button, Heading, VStack, useMediaQuery, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import TextInput from '../../../../../../../components/inputFields/textInput/TextInput';

const EditEducation = ({ userData }) => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const [credentials, setCredentials] = useState({
        ssc: {
            board: "",
            schoolName: ""
        },
        hsc: {
            board: "",
            collegeName: ""
        },
        diploma: {
            stream: "",
            collegeName: ""
        },
        degree: {
            stream: "",
            collegeName: ""
        },
    });
    console.log('credentials: ', credentials);

    // const handleCredentialsChange = (event, category, field) => {
    //     setCredentials({
    //         ...credentials,
    //         [category]: {
    //             ...credentials[category],
    //             [field]: event.target.value
    //         }
    //     });
    // };

    const onChange = (e, category, field) => {
        console.log('e: ', e);
        console.log('field: ', field);
        console.log('category: ', category);
        // setCredentials({ ...credentials, [category]: { ...credentials[category], [field]: e.target.value } })
    }

    const handleSubmit = async () => {

    }

    useEffect(() => {
        if (userData) {
            setCredentials({
                ssc: {
                    board: userData.board,
                    schoolName: userData.schoolName
                },
                hsc: {
                    board: userData.board,
                    collegeName: userData.collegeName
                },
                diploma: {
                    stream: userData.stream,
                    collegeName: userData.collegeName
                },
                degree: {
                    stream: userData.stream,
                    collegeName: userData.collegeName
                },
            });
        }
    }, []);

    return (
        <>
            <Box mt={4} px={4} py={!mobileScreen && 4} boxShadow={!mobileScreen && 'xs'}>
                <form onSubmit={handleSubmit}>

                    {/* SSC details */}
                    <Box boxShadow='xs' borderRadius={8} p='14px 12px'>
                        <Box fontFamily='var(--semiBold-font)'>SSC details</Box>
                        <VStack gap={0.5} mt={2}>
                            <TextInput props={{
                                isRequired: true,
                                label: "Board name",
                                placeholder: "Maharashtra Board",
                                name: "board",
                                value: credentials.ssc.board,
                                onChange: onChange
                            }} />

                            <TextInput props={{
                                isRequired: true,
                                label: "School name",
                                placeholder: "Don Bosco High School",
                                name: "schoolName",
                                value: credentials.ssc.schoolName,
                                onChange: onChange
                            }} />
                        </VStack>
                    </Box>

                    <br />

                    {/* HSC details */}
                    <Box boxShadow='xs' borderRadius={8} p='14px 12px'>
                        <Box fontFamily='var(--semiBold-font)'>HSC details</Box>
                        <VStack gap={0.5} mt={2}>
                            <TextInput props={{
                                isRequired: true,
                                label: "Board name",
                                placeholder: "Mahasashtra Board",
                                name: "board",
                                value: credentials.hsc.board,
                                onChange: onChange
                            }} />

                            <TextInput props={{
                                isRequired: true,
                                label: "School name",
                                placeholder: "Nirmala Memorial Foundation College",
                                name: "schoolName",
                                value: credentials.hsc.collegeName,
                                onChange: onChange
                            }} />
                        </VStack>
                    </Box>

                    <br />

                    {/* Diploma details */}
                    <Box boxShadow='xs' borderRadius={8} p='14px 12px'>
                        <Box fontFamily='var(--semiBold-font)'>Diploma details</Box>
                        <VStack gap={0.5} mt={2}>
                            <TextInput props={{
                                isRequired: true,
                                label: "Stream",
                                placeholder: "IT",
                                name: "stream",
                                value: credentials.diploma.stream,
                                onChange: onChange
                            }} />

                            <TextInput props={{
                                isRequired: true,
                                label: "College name",
                                placeholder: "Vartak Polytechnic",
                                name: "collegeName",
                                value: credentials.diploma.collegeName,
                                onChange: onChange
                            }} />
                        </VStack>
                    </Box>

                    <br />

                    {/* Degree details */}
                    <Box boxShadow='xs' borderRadius={8} p='14px 12px'>
                        <Box fontFamily='var(--semiBold-font)'>Degree details</Box>
                        <VStack gap={0.5} mt={2}>
                            <TextInput props={{
                                isRequired: true,
                                label: "Stream",
                                placeholder: "IT",
                                name: "stream",
                                value: credentials.degree.stream,
                                onChange: onChange
                            }} />

                            <TextInput props={{
                                isRequired: true,
                                label: "College name",
                                placeholder: "MHSSCOE",
                                name: "collegeName",
                                value: credentials.degree.collegeName,
                                onChange: onChange
                            }} />
                        </VStack>
                    </Box>

                    <Button
                        type='submit'
                        className='zeptical-red-fill-button'
                        mt={5}
                        w='100%'
                        isLoading={loading}
                        loadingText='Updating'
                    >
                        Update
                    </Button>

                </form>
            </Box>
        </>
    )
}

export default EditEducation
