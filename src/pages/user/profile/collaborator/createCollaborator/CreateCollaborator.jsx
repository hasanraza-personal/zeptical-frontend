import { Box, Container, Flex, Image, useMediaQuery, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import SystemLoader from '../../../../../components/loader/systemLoader/SystemLoader';
import axios from 'axios';
import { useSelector } from 'react-redux';
import CollaboratorStatus from './components/CollaboratorStatus';
import CollaboratorError from './components/CollaboratorError';
import CollaboratorForm from './components/CollaboratorForm';
import successImage from '../../../../../public/images/undraw/success.svg';
import LazyLoad from 'react-lazy-load';
import PreviousLocation from '../../../../../components/previousLocation/PreviousLocation';


const CreateCollaborator = () => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const [loadCompleted, setLoadCompleted] = useState(false);
    const [userDataStatus, setUserDataStatus] = useState([]);
    const toast = useToast();
    const user = useSelector((state) => state.user.value);
    const [checkStatus, setCheckStatus] = useState(false);
    const [collaboratorData, setCollaboratorData] = useState({});
    const previousLocation = "Profile";

    const fetchUser = async () => {
        try {
            const response = await axios({
                method: 'GET',
                url: `/api/user/profile/getuserprofile/${user.globalUsername}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            let data = response.data.user;
            setCollaboratorData(data.collaborator)
            
            setUserDataStatus([
                {
                    status: data.location ? "success" : "warning",
                    msg: data.location ? "Your location details are available" : "Please provide your location details"
                },
                {
                    status: data.education ? "success" : "warning",
                    msg: data.education ? "Your education details are available" : "Please provide your education details"
                },
                {
                    status: data.skill.length !== 0 ? "success" : "warning",
                    msg: data.skill.length !== 0 ? "Your skills are available" : "Please provide your skills"
                },
                {
                    status: data.project.length !== 0 ? "success" : "warning",
                    msg: data.project.length !== 0 ? "Your project details are available" : "Please provide your atleast one project"
                }
            ])
            setLoadCompleted(true);
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
        if (user.globalUsername.length !== 0) {
            fetchUser();
        }
    }, [user.globalUsername]);

    useEffect(() => {
        const result = userDataStatus.some(element => element.status === "warning")
        setCheckStatus(result);
    }, [userDataStatus])

    if (loadCompleted) {
        if (!collaboratorData.isApplied) {
            return (
                <>
                    <Container maxW='xl' p={mobileScreen ? '10px 10px' : '10px 15px'} boxShadow={!mobileScreen && 'xs'}>
                        <Box fontFamily='var(--semiBold-font)' fontSize={24}>Register as collaborator</Box>

                        <CollaboratorStatus props={{ data: userDataStatus }} />

                        {!checkStatus ? <>
                            <CollaboratorForm />
                        </> : <>
                            <CollaboratorError />
                        </>}

                    </Container>
                </>
            )
        } else {
            return (
                <>
                    <Container maxW='xl' p={0}>
                        <Box>
                            <PreviousLocation props={{ location: previousLocation }} />
                        </Box>

                        <Box p={mobileScreen ? '10px 10px' : '10px 15px'} mt={2} boxShadow={!mobileScreen && 'xs'}>
                            <Flex as={LazyLoad} justifyContent='center'>
                                <Image src={successImage} w={200} />
                            </Flex>
                            <Box textAlign='center' fontSize={18} mt={3}>
                                You are already registered as collaborator
                            </Box>
                        </Box>
                    </Container>
                </>
            )
        }

    } else {
        return (
            <Container maxW='xl' p='0' pb={20}>
                <SystemLoader />
            </Container>
        )
    }
}

export default CreateCollaborator
