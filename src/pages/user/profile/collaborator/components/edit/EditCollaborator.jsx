import { Box, Button, Container, Flex, Image, VStack, useMediaQuery, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import NotFoundImage from '../../../../../../public/images/undraw/not_found.svg';
import LazyLoad from 'react-lazy-load';
import { useLocation } from 'react-router-dom';
import PreviousLocation from '../../../../../../components/previousLocation/PreviousLocation';
import TextInput from '../../../../../../components/inputFields/textInput/TextInput';
import axios from 'axios';

const EditCollaborator = () => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
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
                toast({
                    position: 'top',
                    title: response.data.msg,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            }, 500)
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

    const { userLocation, previousLocation, pageType } = location.state;

    useEffect(() => {
        if (userLocation) {
            setCredentials({
                userCity: userLocation.userCity,
                userState: userLocation.userState,
            })
        }
    }, [])

    if (!location.state) {
        return (
            <>
                <Container boxShadow={!mobileScreen && 'xs'} p={4} maxW='xl'>
                    <Flex as={LazyLoad} justifyContent='center'>
                        <Image src={NotFoundImage} w={200} />
                    </Flex>
                    <Flex justifyContent='center' mt={5} fontSize={18} color='var(--dark-grey-color)'>The page you are looking for does not exist.</Flex>
                </Container>
            </>
        )
    }

    return (
        <>
            <Container maxW='xl' p={0}>
                <Box>
                    <PreviousLocation props={{ location: previousLocation }} />
                </Box>

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

            </Container>
        </>
    )
}

export default EditCollaborator
