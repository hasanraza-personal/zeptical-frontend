import React, { useState } from 'react';
import typeWriterImage from '../../../../../public/images/undraw/typewriter.svg';
import { Box, Button, Flex, FormControl, HStack, Image, PinInput, PinInputField, useToast } from '@chakra-ui/react';
import LazyLoad from 'react-lazy-load';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../../../../slice/UserSlice';
import OTPExpired from './OTPExpired';
import { useNavigate } from 'react-router-dom';

const EmailVerificationForm = ({ props }) => {
    const [userOTP, setUserOTP] = useState(null);
    const [loading, setLoading] = useState(false);
    const [otpExpired, setOTPExpired] = useState(false);
    const toast = useToast();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (userOTP.trim().length !== 4) {
            toast({
                position: 'top',
                title: "Please provide 4 digit OTP",
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
                url: '/api/user/auth/verifyemail',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${props.token}`
                },
                data: { otp: userOTP }
            });
            const data = response.data
            console.log('data: ', data);

            if (data.msg === "OTP expired") {
                setOTPExpired(true)
                setLoading(false)
                return
            }

            localStorage.setItem('token', data.authToken);
            localStorage.setItem('type', "user");
            dispatch(login({
                globalUserFullname: data.user.userFullname,
                globalUsername: data.user.username,
                globalUserPhoto: data.user.userPhoto
            }));

            setTimeout(() => {
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

    return (
        <>
            {!otpExpired ? <>
                <Flex as={LazyLoad} justifyContent='center' pt={4}>
                    <Image src={typeWriterImage} w={200} />
                </Flex>

                <Box mt={5}>
                    <Box className='email-verification-title'>Verify your email</Box>
                    <Box className='email-verification-desc'>Please enter 4 digit code sent to {props.tempEmail}</Box>
                </Box>

                <form onSubmit={handleSubmit}>
                    <FormControl mt={5}>
                        <HStack gap={5}>
                            <PinInput
                                size='lg'
                                name='otp'
                                onChange={(e) => setUserOTP(e)}
                            >
                                <PinInputField autoFocus className='input-focus' />
                                <PinInputField className='input-focus' />
                                <PinInputField className='input-focus' />
                                <PinInputField className='input-focus' />
                            </PinInput>
                        </HStack>
                    </FormControl>
                    <Button
                        type='submit'
                        className='zeptical-red-fill-button'
                        mt={5}
                        w='100%'
                        isLoading={loading}
                        loadingText='Verifying'
                    >
                        Confirm
                    </Button>
                </form>
            </> : <>
                <OTPExpired />
            </>}
        </>
    )
}

export default EmailVerificationForm
