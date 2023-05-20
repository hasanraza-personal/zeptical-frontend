import { Box, Button, Container, Flex, Image, VStack, useMediaQuery, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import NotFoundImage from '../../../../../../public/images/undraw/not_found.svg';
import LazyLoad from 'react-lazy-load';
import { useLocation } from 'react-router-dom';
import PreviousLocation from '../../../../../../components/previousLocation/PreviousLocation';
import TextInput from '../../../../../../components/inputFields/textInput/TextInput';
import axios from 'axios';
import EditLocation from './components/EditLocation';
import EditEducation from './components/EditEducation';

const EditCollaborator = () => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const location = useLocation();

    const { userData, previousLocation, pageType } = location.state;

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
            <Container maxW='xl' p={0} pb={20}>
                <Box>
                    <PreviousLocation props={{ location: previousLocation }} />
                </Box>

                {pageType === "locationDetails" &&
                    <EditLocation userData={userData} />
                }

                {pageType === "educationDetails" &&
                    <EditEducation userData={userData} />
                }



            </Container>
        </>
    )
}

export default EditCollaborator
