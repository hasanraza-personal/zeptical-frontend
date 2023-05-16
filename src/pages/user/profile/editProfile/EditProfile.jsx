import { Box, Button, Container, Flex, FormControl, FormHelperText, FormLabel, Image, Input, VStack, useMediaQuery, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import PreviousLocation from '../../../../components/previousLocation/PreviousLocation';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { login } from '../../../../slice/UserSlice';
import PhotoInput from '../../../../components/inputFields/photoInput/PhotoInput';
import TextInput from '../../../../components/inputFields/textInput/TextInput';
import SelectInput from '../../../../components/inputFields/selectInput/SelectInput';
import LazyLoad from 'react-lazy-load';
import NotFoundImage from '../../../../public/images/undraw/not_found.svg';

const EditProfile = () => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const location = useLocation();
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState()
    const [photoSelected, setPhotoSelected] = useState(false);
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({
        userFullname: "",
        username: "",
        userEmail: "",
        userGender: "",
        userPhoto: "",
    });

    const options = [
        {
            label: "Male",
            value: "male"
        },
        {
            label: "Female",
            value: "female"
        }
    ]

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (credentials.userFullname.trim().length < 5) {
            toast({
                position: 'top',
                title: "Name should be atleast 5 characters long",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return
        }

        if (credentials.username.trim().length < 5) {
            toast({
                position: 'top',
                title: "Username should be atleast 5 characters long",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return
        }


        if (credentials.userGender.trim().length === 0) {
            toast({
                position: 'top',
                title: "Please provide your gender",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return
        }
        setPhotoSelected(false);
        setLoading(true);

        const formData = new FormData();
        formData.append('userFullname', credentials.userFullname);
        formData.append('username', credentials.username);
        formData.append('userGender', credentials.userGender);
        formData.append('userPhoto', credentials.userPhoto);

        try {
            let response = await axios({
                method: 'POST',
                url: '/api/user/profile/updateprofile',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                data: formData
            });
            const data = response.data;

            setTimeout(() => {
                dispatch(login({
                    globalUserFullname: data.user.userFullname,
                    globalUsername: data.user.username,
                    globalUserPhoto: data.user.userPhoto
                }))
                toast({
                    position: 'top',
                    title: response.data.msg,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                setLoading(false);
            }, 500)
        } catch (error) {
            setLoading(false)
            toast({
                position: 'top',
                title: error.response.data.msg,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    }

    const fetchUser = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: '/api/user/profile/getuserdetails',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            const data = response.data.user

            setCredentials({
                userFullname: data.userFullname,
                userEmail: data.userEmail,
                username: data.username,
                userGender: data.userGender,
                userPhoto: data.userPhoto
            })
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

    const handleRemove = () => {
        setPhoto(user.globalUserPhoto);
        setPhotoSelected(false)
    }

    useEffect(() => {
        fetchUser();
        // eslint-disable-next-line
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


    const { previousLocation } = location.state;

    return (
        <>
            <Container maxW='xl' p={0}>
                <Box>
                    <PreviousLocation props={{ location: previousLocation }} />
                </Box>

                <Box mt={4} px={4} py={!mobileScreen && 4} boxShadow={!mobileScreen && 'xs'}>
                    <form onSubmit={handleSubmit}>
                        <PhotoInput props={{
                            name: "userPhoto",
                            value: credentials.userPhoto,
                            credentials: credentials,
                            setCredentials: setCredentials,
                            photo: photo,
                            setPhoto: setPhoto,
                            setPhotoSelected: setPhotoSelected
                        }} />

                        {photoSelected && !loading &&
                            <Button mt={2} w='100%' size='sm' onClick={handleRemove}>Remove Selected Photo</Button>
                        }

                        <VStack gap={0.5} mt={4}>
                            <TextInput props={{
                                isRequired: true,
                                label: "Fullname",
                                placeholder: "John Doe",
                                name: "userFullname",
                                value: credentials.userFullname,
                                onChange: onChange
                            }} />

                            <TextInput props={{
                                isRequired: true,
                                label: "Username",
                                placeholder: "johndoe536",
                                name: "username",
                                value: credentials.username,
                                onChange: onChange
                            }} />

                            <FormControl>
                                <FormLabel mb={0}>Email</FormLabel>
                                <Input type='email' name='userEmail' value={credentials.userEmail} isDisabled />
                                <FormHelperText mt={0}>You cannot change your email</FormHelperText>
                            </FormControl>

                            <SelectInput
                                props={{
                                    isRequired: true,
                                    label: "Gender",
                                    placeholder: "Select Gender",
                                    name: "userGender",
                                    value: credentials.userGender,
                                    onChange: onChange,
                                    options: options
                                }}
                            />
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

export default EditProfile
