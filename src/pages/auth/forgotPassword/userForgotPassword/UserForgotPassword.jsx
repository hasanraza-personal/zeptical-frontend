import { Box, Button, Container, Flex, Image, useMediaQuery, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
// import { Helmet } from 'react-helmet-async';
import './userforgotpassword.css';
import forgotPasswordImage from '../../../../public/images/undraw/forgot_password.svg';
import LazyLoad from 'react-lazy-load';
import EmailInput from '../../../../components/inputFields/emailInput/EmailInput';
// import { useNavigate } from 'react-router-dom';
import PreviousLocation from '../../../../components/previousLocation/PreviousLocation';
import axios from 'axios';

const UserForgotPassword = () => {
    const [mobileScreen] = useMediaQuery('(min-width: 850px)');
    const [credentials, setCredentials] = useState({
        userEmail: ""
    });
    const [loading, setLoading] = useState(false);
    // const navigate = useNavigate();
    const toast = useToast();

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (credentials.userEmail.trim().length === 0) {
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
        setLoading(true);

        try {
            let response = await axios({
                method: 'POST',
                url: '/api/user/auth/sendrecoverylink',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: { userEmail: credentials.userEmail }
            });
            const data = response.data

            setTimeout(() => {
                setLoading(false)
                setCredentials({ userEmail: "" });
                toast({
                    position: 'top',
                    title: 'Link sent.',
                    description: data.msg,
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            }, 1000)
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

    return (
        <>
            {/* <Helmet>
                <title>Zeptical - Forgot password</title>
                <meta name="description" content="Forgot password | Can't log in." />
                <link rel='canonical' href='https://zeptical.com/user/forgotpassword' />
                <meta name="keywords" content="Startup, Mentor, Investor, Collaborator, Social, Business, Idea, Product, Courage, Consistence, Hard Work, Motivation, Team, Friends, Social, Achievement" />
            </Helmet> */}

            <Container className='container' boxShadow={mobileScreen && 'xs'} mt={mobileScreen && 5} maxW='md'>
                <PreviousLocation props={{ location: "Login" }} />

                <Flex as={LazyLoad} justifyContent='center' pt={4}>
                    <Image src={forgotPasswordImage} w={220} />
                </Flex>

                <Box mt={5}>
                    <Box className='title'>Forgot Password?</Box>
                    <Box className='desc'>Don't worry! It happens. Please enter the email address associated with your account.</Box>
                </Box>

                <form onSubmit={handleSubmit}>
                    <Box mt={4}>
                        <EmailInput props={{
                            isRequired: true,
                            label: "Email",
                            placeholder: "johndoe@gmail.com",
                            name: "userEmail",
                            value: credentials.userEmail,
                            onChange: onChange
                        }} />
                    </Box>
                    <Button
                        type='submit'
                        className='zeptical-red-fill-button'
                        mt={5}
                        w='100%'
                        isLoading={loading}
                        loadingText='Sending Email'
                    >
                        Submit
                    </Button>
                </form>
            </Container>

        </>
    )
}

export default UserForgotPassword
