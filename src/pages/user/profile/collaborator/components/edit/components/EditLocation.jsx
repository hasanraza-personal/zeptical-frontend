import { Box, Button, Container, VStack, useMediaQuery, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TextInput from '../../../../../../../components/inputFields/textInput/TextInput';
import SystemLoader from '../../../../../../../components/loader/systemLoader/SystemLoader';
import { useNavigate } from 'react-router-dom';

const EditLocation = () => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const [loadCompleted, setLoadCompleted] = useState(false);
    const [credentials, setCredentials] = useState({
        userCity: "",
        userState: "",
    });

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (credentials.userCity.length === 0) {
            toast({
                position: 'top',
                title: "Please provide your city name",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return
        }

        if (credentials.userState.length === 0) {
            toast({
                position: 'top',
                title: "Please provide your state name",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return
        }
        setLoading(true);

        try {
            let response = await axios({
                method: 'POST',
                url: '/api/user/profile/updatelocation',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                data: { userCity: credentials.userCity, userState: credentials.userState }
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
                url: `/api/user/profile/getuserlocation`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            const data = response.data.user;
            if (data.location) {
                setCredentials({
                    userCity: data.location.userCity,
                    userState: data.location.userState,
                })
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
                    <form onSubmit={handleSubmit}>

                        <VStack gap={0.5} mt={4}>
                            <TextInput props={{
                                isRequired: true,
                                label: "City name",
                                placeholder: "Mumbai",
                                name: "userCity",
                                value: credentials.userCity,
                                onChange: onChange
                            }} />

                            <TextInput props={{
                                isRequired: true,
                                label: "State name",
                                placeholder: "Maharashtra",
                                name: "userState",
                                value: credentials.userState,
                                onChange: onChange
                            }} />
                        </VStack>

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
    } else {
        return (
            <Container maxW='xl' p='0' pb={20}>
                <SystemLoader />
            </Container>
        )
    }
}

export default EditLocation
