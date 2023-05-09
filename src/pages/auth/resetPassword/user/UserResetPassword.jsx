import { Box, Button, Container, Flex, Image, VStack, useMediaQuery, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import PasswordImage from '../../../../public/images/undraw/password.svg';
import LazyLoad from 'react-lazy-load';
import PasswordInput from '../../../../components/inputFields/passwordInput/PasswordInput';
import './userresetpassword.css'
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import successImage from '../../../../public/images/undraw/success.svg';
import expiredImage from '../../../../public/images/undraw/expired.svg';

const UserResetPassword = () => {
    const [searchParams] = useSearchParams();
    const urlEmail = searchParams.get("qpvnfhdoeG3YDBybcbTljMdrshsynTWMZIRVDbs")
    const urlTime = searchParams.get("rthbsdFjkshJYFhjfsufjdcgyudsxch")

    const [credentials, setCredentials] = useState({
        userPassword: "",
        confirmPassword: ""
    })
    const [loading, setLoading] = useState(false);
    const [mobileScreen] = useMediaQuery('(min-width: 850px)');
    const toast = useToast();
    const [reset, setReset] = useState(false);
    const [linkExpired, setLinkExpired] = useState(false);

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (credentials.userPassword.length < 6) {
            toast({
                position: 'top',
                title: "Password must contain atleast 6 characters",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return
        }

        if (credentials.userPassword !== credentials.confirmPassword) {
            toast({
                position: 'top',
                title: "Password does not matched",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return
        }
        setLoading(true)

        try {
            await axios({
                method: 'POST',
                url: '/api/user/auth/resetpassword',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    userPassword: credentials.userPassword,
                    confirmPassword: credentials.confirmPassword,
                    urlEmail,
                    urlTime
                }
            });

            setTimeout(() => {
                setLoading(false)
                setReset(true)
            }, 1000)
        } catch (error) {
            setLoading(false);

            if (error.response.data.msg === "Link expired") {
                setLinkExpired(true);
            }

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
            <Container className='container' boxShadow={mobileScreen && 'xs'} mt={mobileScreen && 5} maxW='md'>
                {!linkExpired ? <>


                    {!reset ? <>
                        <Flex as={LazyLoad} justifyContent='center' pt={4}>
                            <Image src={PasswordImage} w={240} />
                        </Flex>

                        <Box mt={5}>
                            <Box className='title'>Reset Password</Box>
                        </Box>

                        <form onSubmit={handleSubmit}>
                            <VStack gap={1.5} mt={4}>
                                <PasswordInput props={{
                                    isRequired: true,
                                    label: "New password",
                                    placeholder: "******",
                                    name: "userPassword",
                                    value: credentials.userPassword,
                                    onChange: onChange
                                }} />

                                <PasswordInput props={{
                                    isRequired: true,
                                    label: "Confirm password",
                                    placeholder: "******",
                                    name: "confirmPassword",
                                    value: credentials.confirmPassword,
                                    onChange: onChange
                                }} />
                            </VStack>

                            <Button
                                type='submit'
                                className='zeptical-red-fill-button'
                                mt={5}
                                w='100%'
                                isLoading={loading}
                                loadingText='Submitting'
                            >
                                Submit
                            </Button>
                        </form>
                    </> : <>
                        <Flex as={LazyLoad} justifyContent='center' pt={4}>
                            <Image src={successImage} w={150} />
                        </Flex>

                        <Flex flexDirection='column' alignItems='center' mt={5}>
                            <Box className='title'>Password Changed!</Box>
                            <Box className='desc'>Your password has been successfully changed! Please login with your new password.</Box>
                        </Flex>

                        <Button
                            className='zeptical-red-fill-button'
                            mt={5}
                            w='100%'
                            as={Link}
                            to='/login'
                        >
                            Back to Login
                        </Button>
                    </>}
                </> : <>
                    <Flex as={LazyLoad} justifyContent='center' pt={4}>
                        <Image src={expiredImage} w={250} />
                    </Flex>

                    <Flex flexDirection='column' alignItems='center' mt={5}>
                        <Box className='title'>Link expired!</Box>
                        <Box className='desc'>This link has been expired. Please click on the below button to request a new link!</Box>
                    </Flex>

                    <Button
                        className='zeptical-red-fill-button'
                        mt={5}
                        w='100%'
                        as={Link}
                        to='/login'
                        props={{ location: "Login" }}
                    >
                        Back to Forgot Password
                    </Button>
                </>}
            </Container>
        </>
    )
}

export default UserResetPassword
