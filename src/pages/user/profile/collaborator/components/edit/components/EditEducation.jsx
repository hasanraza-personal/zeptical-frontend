import { Box, Button, Container, VStack, useMediaQuery, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import TextInput from '../../../../../../../components/inputFields/textInput/TextInput';
import axios from 'axios';
import SystemLoader from '../../../../../../../components/loader/systemLoader/SystemLoader';
import { useNavigate } from 'react-router-dom';

const EditEducation = () => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const [loadCompleted, setLoadCompleted] = useState(false);
    const navigate = useNavigate();
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

    const onChange = (e) => {
        let category = e.target.name.split('.')[0];
        let field = e.target.name.split('.')[1];

        setCredentials({ ...credentials, [category]: { ...credentials[category], [field]: e.target.value } });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ((credentials.ssc.board.length === 0 && credentials.ssc.schoolName.length === 0) && (credentials.hsc.board.length === 0 && credentials.hsc.collegeName.length === 0) && (credentials.diploma.stream.length === 0 && credentials.diploma.collegeName.length === 0) && (credentials.degree.stream.length === 0 && credentials.degree.collegeName.length === 0)) {
            toast({
                position: 'top',
                title: "Please provide atleast one educational information",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return
        }

        // SSC 
        if ((credentials.ssc.board.length === 0 && credentials.ssc.schoolName.length !== 0) || (credentials.ssc.board.length !== 0 && credentials.ssc.schoolName.length === 0)) {
            toast({
                position: 'top',
                title: "Please provide your SSC school name and board name",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return
        }

        // HSC 
        if ((credentials.hsc.board.length === 0 && credentials.hsc.collegeName.length !== 0) || (credentials.hsc.board.length !== 0 && credentials.hsc.collegeName.length === 0)) {
            toast({
                position: 'top',
                title: "Please provide your HSC college name and board name",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return
        }

        // Diploma 
        if ((credentials.diploma.stream.length === 0 && credentials.diploma.collegeName.length !== 0) || (credentials.diploma.stream.length !== 0 && credentials.diploma.collegeName.length === 0)) {
            toast({
                position: 'top',
                title: "Please provide your Diploma college name and stream name",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });

        }

        // Degree 
        if ((credentials.degree.stream.length === 0 && credentials.degree.collegeName.length !== 0) || (credentials.degree.stream.length !== 0 && credentials.degree.collegeName.length === 0)) {
            toast({
                position: 'top',
                title: "Please provide your Degree college name and stream name",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }


        setLoading(true);

        try {
            let response = await axios({
                method: 'POST',
                url: '/api/user/profile/updateeducation',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                data: { ssc: credentials.ssc, hsc: credentials.hsc, diploma: credentials.diploma, degree: credentials.degree }
            });

            setTimeout(() => {
                setLoading(false);
                navigate(-1)
                toast({
                    position: 'top',
                    title: response.data.msg,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            }, 1000)
        } catch (error) {
            setLoading(false);
            toast({
                position: 'top',
                title: error.response.data.msg,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }

    }

    const fetchUserLocation = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: `/api/user/profile/getusereducation`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            const data = response.data.user;

            if (data.education) {
                let tempCredentials = {};

                if (data.education.ssc) {
                    tempCredentials.ssc = {
                        board: data.education.ssc.board,
                        schoolName: data.education.ssc.schoolName,
                    };
                } else {
                    tempCredentials.ssc = {
                        board: "",
                        schoolName: "",
                    };
                }

                if (data.education.hsc) {
                    tempCredentials.hsc = {
                        board: data.education.hsc.board,
                        collegeName: data.education.hsc.collegeName
                    };
                } else {
                    tempCredentials.hsc = {
                        board: "",
                        collegeName: ""
                    };
                }

                if (data.education.diploma) {
                    tempCredentials.diploma = {
                        stream: data.education.diploma.stream,
                        collegeName: data.education.diploma.collegeName
                    };
                } else {
                    tempCredentials.diploma = {
                        stream: "",
                        collegeName: ""
                    };
                }

                if (data.education.degree) {
                    tempCredentials.degree = {
                        stream: data.education.degree.stream,
                        collegeName: data.education.degree.collegeName
                    };
                } else {
                    tempCredentials.degree = {
                        stream: "",
                        collegeName: ""
                    };
                }

                setCredentials(tempCredentials);
            }
            setLoadCompleted(true);
        } catch (error) {
            toast({
                position: 'top',
                title: error.response.data.msg,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    }

    useEffect(() => {
        fetchUserLocation();
        // eslint-disable-next-line
    }, []);

    if (loadCompleted) {
        return (
            <>
                <Box mt={4} px={4} py={!mobileScreen && 4} boxShadow={!mobileScreen && 'xs'}>

                    {/* SSC details */}
                    <Box boxShadow='xs' borderRadius={8} p='14px 12px'>
                        <Box fontFamily='var(--semiBold-font)'>SSC details</Box>
                        <VStack gap={0.5} mt={2}>
                            <TextInput props={{
                                isRequired: true,
                                label: "Board name",
                                placeholder: "Maharashtra Board",
                                name: "ssc.board",
                                value: credentials.ssc.board,
                                onChange: onChange
                            }} />

                            <TextInput props={{
                                isRequired: true,
                                label: "School name",
                                placeholder: "Don Bosco High School",
                                name: "ssc.schoolName",
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
                                name: "hsc.board",
                                value: credentials.hsc.board,
                                onChange: onChange
                            }} />

                            <TextInput props={{
                                isRequired: true,
                                label: "College name",
                                placeholder: "Nirmala Memorial Foundation College",
                                name: "hsc.collegeName",
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
                                name: "diploma.stream",
                                value: credentials.diploma.stream,
                                onChange: onChange
                            }} />

                            <TextInput props={{
                                isRequired: true,
                                label: "College name",
                                placeholder: "Vartak Polytechnic",
                                name: "diploma.collegeName",
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
                                name: "degree.stream",
                                value: credentials.degree.stream,
                                onChange: onChange
                            }} />

                            <TextInput props={{
                                isRequired: true,
                                label: "College name",
                                placeholder: "MHSSCOE",
                                name: "degree.collegeName",
                                value: credentials.degree.collegeName,
                                onChange: onChange
                            }} />
                        </VStack>
                    </Box>

                    <Button
                        className='zeptical-red-fill-button'
                        mt={5}
                        w='100%'
                        isLoading={loading}
                        loadingText='Updating'
                        onClick={handleSubmit}
                    >
                        Update
                    </Button>

                </Box>
            </>
        )
    } else {
        return (
            <Container maxW='xl' p='0' pb={20}>
                <SystemLoader />
            </Container>
        )
    }
}

export default EditEducation
