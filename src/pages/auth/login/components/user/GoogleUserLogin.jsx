import { Flex, Box, Image, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import LazyLoad from 'react-lazy-load';
import googleIconImage from '../../../../../public/images/google_icon.svg';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { login } from '../../../../../slice/UserSlice';
import { useGoogleLogin } from '@react-oauth/google';

const GoogleUserLogin = ({ props }) => {
    const dispatch = useDispatch();
    const toast = useToast();
    // const navigate = useNavigate();

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async tokenResponse => {
            try {
                const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        "Authorization": `Bearer ${tokenResponse.access_token}`
                    }
                })
                const googleData = res.data

                try {
                    let response = await axios({
                        method: 'POST',
                        url: '/api/user/auth/googlelogin',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: googleData
                    });
                    const data = response.data;

                    localStorage.setItem('token', data.authToken);
                    dispatch(login({
                        globalUserFullname: data.user.userFullname,
                        globalUsername: data.user.username,
                        globalUserPhoto: data.user.userPhoto
                    }))

                    if (data.userExist === false) {
                        props.setUserExistDB(false)
                    } else {
                        // navigate('/home')
                        alert("Google login successfull")
                    }

                } catch (error) {
                    toast({
                        position: 'top',
                        title: error.response.data.msg,
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    });
                }
            } catch (error) {
                toast({
                    position: 'top',
                    title: "Something went wrong. Please try again",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        }
    })

    return (
        <>
            <Flex className='google-btn' mt={5} onClick={handleGoogleLogin}>
                <LazyLoad>
                    <Image src={googleIconImage} w={5} />
                </LazyLoad>
                <Box ml={2} className='semi-bold-font'>Sign in with Google</Box>
            </Flex>
        </>
    )
}

export default GoogleUserLogin
