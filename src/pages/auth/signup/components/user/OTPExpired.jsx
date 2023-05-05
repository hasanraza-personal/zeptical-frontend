import React from 'react';
import otpExpiredImage from '../../../../../public/images/undraw/expired.svg';
import { Box, Button, Flex, Image } from '@chakra-ui/react';
import LazyLoad from 'react-lazy-load';
import { Link } from 'react-router-dom';

const OTPExpired = () => {
    return (
        <>
            <Flex as={LazyLoad} justifyContent='center' pt={4}>
                <Image src={otpExpiredImage} w={200} />
            </Flex>

            <Flex flexDirection='column' alignItems='center' mt={6}>
                <Box className='email-verification-title'>OTP Expired</Box>
                <Box className='email-verification-desc'>
                    Your OTP has been expired. Please click on the below button to
                    fill the form again.
                </Box>
            </Flex>

            <Button
                as={Link}
                to='/signup'
                className='zeptical-red-fill-button'
                mt={5}
                w='100%'
            >
                Back to Signup
            </Button>
        </>
    )
}

export default OTPExpired
