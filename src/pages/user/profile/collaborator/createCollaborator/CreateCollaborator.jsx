import { Box, Container, Flex, Image, useMediaQuery, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import PreviousLocation from '../../../../../components/previousLocation/PreviousLocation';
import Title from './components/Title';
import Page1 from './components/pages/page1/Page1';
import { useSelector } from 'react-redux';
import axios from 'axios';
import SystemLoader from '../../../../../components/loader/systemLoader/SystemLoader';
import SuccessImage from '../../../../../public/images/undraw/success.svg';
import LazyLoad from 'react-lazy-load';

const CreateCollaborator = () => {
    const [mobileScreen] = useMediaQuery('(min-width: 850px)');
    const user = useSelector((state) => state.user.value);
    const toast = useToast();
    const [userData, setUserData] = useState(null);
    const [loadCompleted, setLoadCompleted] = useState(false);
    // const [testData, setTestData] = useState(true);

    const fetchUserData = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: `/api/user/profile/getuserprofile/${user.globalUsername}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            let data = response.data.user;
            setTimeout(() => {
                setUserData(data);
                setLoadCompleted(true);
            }, 20)
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

    useEffect(() => {
        if (user.globalUsername) {
            fetchUserData();
        }
    }, [user.globalUsername])

    if (loadCompleted) {
        return (
            <>
                <Container boxShadow={mobileScreen && 'xs'} maxW='xl' p='8px 15px' pb={25}>
                    {!userData.collaborator.isApplied ? <>
                        <Title />
                        <Page1 props={userData} />
                    </> : <>
                        <Flex as={LazyLoad} justifyContent='center' mt={5}>
                            <Image src={SuccessImage} w={200} />
                        </Flex>
                        <Box textAlign='center' fontSize={20} mt={4}>
                            You have already registered as collaborator
                        </Box>
                    </>}
                </Container>
            </>
        )
    } else {
        return (
            <Container maxW='xl' p='0' pb={20}>
                <SystemLoader />
            </Container>
        )
    }
}

export default CreateCollaborator
