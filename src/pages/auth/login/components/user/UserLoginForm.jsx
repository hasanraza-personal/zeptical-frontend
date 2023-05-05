import React, { useState } from 'react'
import EmailInput from '../../../../../components/inputFields/emailInput/EmailInput'
import PasswordInput from '../../../../../components/inputFields/passwordInput/PasswordInput';
import { Box, Button, Flex, VStack, useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../../../../slice/UserSlice';

const UserLoginForm = () => {
    const [credentials, setCredentials] = useState({
        userEmail: "",
        userPassword: ""
    });
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (credentials.userEmail.length === 0) {
            toast({
                position: 'top',
                title: "Please provide an email",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return
        }

        if (!isValidEmail(credentials.userEmail)) {
            toast({
                position: 'top',
                title: "Please provide a valid email address",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return
        }

        if (credentials.userPassword.length === 0) {
            toast({
                position: 'top',
                title: "Password cannot be blank",
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
                url: '/api/user/auth/login',
                headers: {
                    'Accept': 'application/json',
                },
                data: { userEmail: credentials.userEmail, userPassword: credentials.userPassword }
            });
            const data = response.data;

            localStorage.setItem('token', data.authToken)
            dispatch(login({
                globalUserFullname: data.user.userFullname,
                globalUsername: data.user.username,
                globalUserPhoto: data.user.userPhoto
            }))

            setTimeout(() => {
                setLoading(false)
                // navigate('/home')
                alert("Logged in successfull")
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

    return (
        <>
            <form onSubmit={handleSubmit}>
                <VStack gap={1.5}>
                    <EmailInput props={{
                        isRequired: true,
                        label: "Email",
                        placeholder: "johndoe@gmail.com",
                        name: "userEmail",
                        value: credentials.userEmail,
                        onChange: onChange
                    }} />

                    <PasswordInput props={{
                        isRequired: true,
                        label: "Password",
                        placeholder: "******",
                        name: "userPassword",
                        value: credentials.userPassword,
                        onChange: onChange
                    }} />
                </VStack>
                <Flex as={Link} to='/user/forgotpassword' justifyContent='end'>Forgot password?</Flex>
                <Button
                    type='submit'
                    className='zeptical-red-fill-button'
                    mt={5}
                    w='100%'
                    isLoading={loading}
                    loadingText='Verifying'
                >
                    Login
                </Button>
                <Box as={Link} to='/signup'>Don't have an account?</Box>
            </form>
        </>
    )
}

export default UserLoginForm
