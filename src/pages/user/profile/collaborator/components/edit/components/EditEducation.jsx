import { Box, Button, Container, Stack, VStack, useMediaQuery, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import TextInput from '../../../../../../../components/inputFields/textInput/TextInput';
import axios from 'axios';
import SystemLoader from '../../../../../../../components/loader/systemLoader/SystemLoader';
import { useNavigate } from 'react-router-dom';
import SuggestionInput from '../../../../../../../components/inputFields/suggestionInput/SuggestionInput';

const EditEducation = () => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const [loadCompleted, setLoadCompleted] = useState(false);
    const navigate = useNavigate();
    const [boardData, setBoardData] = useState([]);
    const [schoolData, setSchoolData] = useState([]);
    const [collegeData, setCollegeData] = useState([]);
    const [streamData, setStreamData] = useState([]);
    const [credentials, setCredentials] = useState({
        sscBoard: "",
        sscSchoolName: "",
        hscBoard: "",
        hscCollegeName: "",
        diplomaStream: "",
        diplomaCollegeName: "",
        degreeStream: "",
        degreeCollegeName: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ((credentials.sscBoard.length === 0 && credentials.sscSchoolName.length === 0) &&
            (credentials.hscBoard.length === 0 && credentials.hscCollegeName.length === 0) &&
            (credentials.diplomaStream.length === 0 && credentials.diplomaCollegeName.length === 0) &&
            (credentials.degreeStream.length === 0 && credentials.degreeCollegeName.length === 0)) {
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
        if ((credentials.sscBoard.length === 0 && credentials.sscSchoolName.length !== 0) || (credentials.sscBoard.length !== 0 && credentials.sscSchoolName.length === 0)) {
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
        if ((credentials.hscBoard.length === 0 && credentials.hscCollegeName.length !== 0) || (credentials.hscBoard.length !== 0 && credentials.hscCollegeName.length === 0)) {
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
        if ((credentials.diplomaStream.length === 0 && credentials.diplomaCollegeName.length !== 0) || (credentials.diplomaStream.length !== 0 && credentials.diplomaCollegeName.length === 0)) {
            toast({
                position: 'top',
                title: "Please provide your Diploma college name and stream name",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });

        }

        // Degree 
        if ((credentials.degreeStream.length === 0 && credentials.degreeCollegeName.length !== 0) || (credentials.degreeStream.length !== 0 && credentials.degreeCollegeName.length === 0)) {
            toast({
                position: 'top',
                title: "Please provide your Degree college name and stream name",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }

        setLoading(true);

        // Save SSC board
        if (credentials.sscBoard.length !== 0) {
            try {
                await axios({
                    method: 'POST',
                    url: '/api/extras/addboard',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    data: { board: credentials.sscBoard }
                });
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

        // Save HSC board
        if (credentials.hscBoard.length !== 0) {
            try {
                await axios({
                    method: 'POST',
                    url: '/api/extras/addboard',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    data: { board: credentials.hscBoard }
                });
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

        // Save SSC school name
        if (credentials.sscSchoolName.length !== 0) {
            try {
                await axios({
                    method: 'POST',
                    url: '/api/extras/addschool',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    data: { school: credentials.sscSchoolName }
                });
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

        // Save HSC college name
        if (credentials.hscCollegeName.length !== 0) {
            try {
                await axios({
                    method: 'POST',
                    url: '/api/extras/addcollege',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    data: { college: credentials.hscCollegeName }
                });
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

        // Save Diploma stream
        if (credentials.diplomaStream.length !== 0) {
            try {
                await axios({
                    method: 'POST',
                    url: '/api/extras/addstream',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    data: { stream: credentials.diplomaStream }
                });
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

        // Save Degree stream
        if (credentials.degreeStream.length !== 0) {
            try {
                await axios({
                    method: 'POST',
                    url: '/api/extras/addstream',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    data: { stream: credentials.degreeStream }
                });
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

        // Save Diploma college name
        if (credentials.diplomaCollegeName.length !== 0) {
            try {
                await axios({
                    method: 'POST',
                    url: '/api/extras/addcollege',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    data: { college: credentials.diplomaCollegeName }
                });
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

         // Save Degree college name
         if (credentials.degreeCollegeName.length !== 0) {
            try {
                await axios({
                    method: 'POST',
                    url: '/api/extras/addcollege',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    data: { college: credentials.degreeCollegeName }
                });
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

        try {
            let response = await axios({
                method: 'POST',
                url: '/api/user/profile/updateeducation',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                data: {
                    sscBoard: credentials.sscBoard,
                    sscSchoolName: credentials.sscSchoolName,
                    hscBoard: credentials.hscBoard,
                    hscCollegeName: credentials.hscCollegeName,
                    diplomaStream: credentials.diplomaStream,
                    diplomaCollegeName: credentials.diplomaCollegeName,
                    degreeStream: credentials.degreeStream,
                    degreeCollegeName: credentials.degreeCollegeName
                }
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

    const fetchUserEducation = async () => {
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
                setCredentials({
                    sscBoard: data.education.sscBoard,
                    sscSchoolName: data.education.sscSchoolName,
                    hscBoard: data.education.hscBoard,
                    hscCollegeName: data.education.hscCollegeName,
                    diplomaStream: data.education.diplomaStream,
                    diplomaCollegeName: data.education.diplomaCollegeName,
                    degreeStream: data.education.degreeStream,
                    degreeCollegeName: data.education.degreeCollegeName
                });
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

    // Fetch board
    const fetchBoard = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: `/api/extras/getboard`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            const data = response.data.result;
            setBoardData(data)
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

    // Fetch school
    const fetchSchool = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: `/api/extras/getschool`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            const data = response.data.result;
            setSchoolData(data)
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

    // Fetch college
    const fetchCollege = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: `/api/extras/getcollege`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            const data = response.data.result;
            setCollegeData(data)
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

    // Fetch stream
    const fetchStream = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: `/api/extras/getstream`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            const data = response.data.result;
            setStreamData(data)
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
        fetchUserEducation();
        fetchBoard();
        fetchSchool();
        fetchCollege();
        fetchStream();
        // eslint-disable-next-line
    }, []);

    if (loadCompleted) {
        return (
            <>
                <Box mt={4} px={4} py={!mobileScreen && 4} boxShadow={!mobileScreen && 'xs'}>

                    {/* SSC details */}
                    <Box boxShadow='xs' borderRadius={8} p='14px 12px'>
                        <Box fontFamily='var(--semiBold-font)'>SSC details</Box>
                        <Stack gap={0.5} mt={2}>
                            <SuggestionInput props={{
                                isRequired: true,
                                label: "Board name",
                                placeholder: "Maharashtra Board",
                                name: "sscBoard",
                                value: credentials.sscBoard,
                                setCredentials: setCredentials,
                                credentials: credentials,
                                data: boardData
                            }} />

                            <SuggestionInput props={{
                                isRequired: true,
                                label: "School name",
                                placeholder: "Don Bosco High School",
                                name: "sscSchoolName",
                                value: credentials.sscSchoolName,
                                setCredentials: setCredentials,
                                credentials: credentials,
                                data: schoolData
                            }} />
                        </Stack>
                    </Box>

                    <br />

                    {/* HSC details */}
                    <Box boxShadow='xs' borderRadius={8} p='14px 12px'>
                        <Box fontFamily='var(--semiBold-font)'>HSC details</Box>
                        <Stack gap={0.5} mt={2}>
                            <SuggestionInput props={{
                                isRequired: true,
                                label: "Board name",
                                placeholder: "Maharashtra Board",
                                name: "hscBoard",
                                value: credentials.hscBoard,
                                setCredentials: setCredentials,
                                credentials: credentials,
                                data: boardData
                            }} />

                            <SuggestionInput props={{
                                isRequired: true,
                                label: "College name",
                                placeholder: "Nirmala Memorial College",
                                name: "hscCollegeName",
                                value: credentials.hscCollegeName,
                                setCredentials: setCredentials,
                                credentials: credentials,
                                data: collegeData
                            }} />
                        </Stack>
                    </Box>

                    <br />

                    {/* Diploma details */}
                    <Box boxShadow='xs' borderRadius={8} p='14px 12px'>
                        <Box fontFamily='var(--semiBold-font)'>Diploma details</Box>
                        <Stack gap={0.5} mt={2}>
                            <SuggestionInput props={{
                                isRequired: true,
                                label: "Stream",
                                placeholder: "Computer Engineering",
                                name: "diplomaStream",
                                value: credentials.diplomaStream,
                                setCredentials: setCredentials,
                                credentials: credentials,
                                data: streamData
                            }} />

                            <SuggestionInput props={{
                                isRequired: true,
                                label: "College name",
                                placeholder: "Vartal Polytechnic",
                                name: "diplomaCollegeName",
                                value: credentials.diplomaCollegeName,
                                setCredentials: setCredentials,
                                credentials: credentials,
                                data: collegeData
                            }} />
                        </Stack>
                    </Box>

                    <br />

                    {/* Degree details */}
                    <Box boxShadow='xs' borderRadius={8} p='14px 12px'>
                        <Box fontFamily='var(--semiBold-font)'>Degree details</Box>
                        <Stack gap={0.5} mt={2}>
                            <SuggestionInput props={{
                                isRequired: true,
                                label: "Stream",
                                placeholder: "Information Technology",
                                name: "degreeStream",
                                value: credentials.degreeStream,
                                setCredentials: setCredentials,
                                credentials: credentials,
                                data: streamData
                            }} />

                            <SuggestionInput props={{
                                isRequired: true,
                                label: "College name",
                                placeholder: "M.H. Saboo Siddik College of Engineering",
                                name: "degreeCollegeName",
                                value: credentials.degreeCollegeName,
                                setCredentials: setCredentials,
                                credentials: credentials,
                                data: collegeData
                            }} />
                        </Stack>
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
