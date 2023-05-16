import { Box, Button, VStack, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import TextInput from '../../../../../components/inputFields/textInput/TextInput';
import SelectInput from '../../../../../components/inputFields/selectInput/SelectInput';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { login } from '../../../../../slice/UserSlice';
import { useNavigate } from 'react-router-dom';

const UpdateUser = ({ props }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
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
    const [credentials, setCredentials] = useState({
        username: "",
        userGender: ""
    });

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

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
        setLoading(true)

        try {
            let response = await axios({
                method: 'POST',
                url: '/api/user/auth/updateuser',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${props.newGoogleUserData.token}`
                },
                data: {
                    username: credentials.username,
                    userGender: credentials.userGender,
                }
            });
            const data = response.data

            setTimeout(() => {
                localStorage.setItem('token', data.authToken);
                localStorage.setItem('type', "user");
                dispatch(login({
                    globalUserFullname: data.user.userFullname,
                    globalUsername: data.user.username,
                    globalUserPhoto: data.user.userPhoto
                }))

                setLoading(false)
                navigate('/user/home')
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

    useEffect(() => {
        setCredentials({ ...credentials, username: props.newGoogleUserData.username })

        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Box fontSize={24} className='bold-font' userSelect='none'>Complete your profile</Box>

            <form onSubmit={handleSubmit}>
                <VStack gap={1.5} mt={5}>
                    <TextInput props={{
                        isRequired: true,
                        label: "Username",
                        placeholder: "johndoe536",
                        name: "username",
                        value: credentials.username,
                        onChange: onChange
                    }} />

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
                    loadingText='Please wait'
                >
                    Continue
                </Button>
            </form>
        </>
    )
}

export default UpdateUser
