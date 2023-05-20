import { Box, Container, Flex, Icon, Image, Tab, TabList, TabPanel, TabPanels, Tabs, useMediaQuery, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { ArrowLeft, Pencil, Person, QrCode, RocketTakeoff } from 'react-bootstrap-icons';
import LazyLoad from 'react-lazy-load';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Collaborator from './collaborator/Collaborator';
import axios from 'axios';
import './profile.css';
import SystemLoader from '../../../components/loader/systemLoader/SystemLoader';

const Profile = () => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const user = useSelector((state) => state.user.value);
    const previousLocation = "Profile";
    const toast = useToast();
    const [loadCompleted, setLoadCompleted] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const username = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
    const [credentials, setCredentials] = useState({
        userFullname: "",
        username: "",
        userPhoto: "",
    });

    const tabHead = [
        Person,
        RocketTakeoff,
        QrCode
    ]

    const fetchUser = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: `/api/user/profile/getuser/${username}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            let data = response.data;
            setCredentials({
                userFullname: data.user.userFullname,
                username: data.user.username,
                userPhoto: data.user.userPhoto
            })

            setLoadCompleted(true)
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
        fetchUser();
        // eslint-disable-next-line
    }, [username])

    if (loadCompleted) {
        return (
            <>
                <Container maxW='xl' p='0' pb={20}>
                    {!mobileScreen &&
                        <>
                            {user.globalUsername === credentials.username ?
                                <Box className='_page_title'>Profile</Box>
                                :
                                <Box className='back-navigation-container' onClick={() => navigate(-1)} fontSize={mobileScreen ? '18px' : '22px'}>
                                    <Icon as={ArrowLeft} />
                                    <Box className='back-navigation-location'>Back</Box>
                                </Box>
                            }
                        </>
                    }

                    {user.globalUsername !== credentials.username && mobileScreen &&
                        <Box className='back-navigation-container' onClick={() => navigate(-1)} fontSize={mobileScreen ? '18px' : '22px'}>
                            <Icon as={ArrowLeft} />
                            <Box className='back-navigation-location'>Back</Box>
                        </Box>
                    }

                    <Box mt={4} px={mobileScreen && 4}>
                        <Flex alignItems='center' justifyContent='space-between'>
                            <Flex alignItems='center' gap={3}>
                                <Box>
                                    <Image src={credentials.userPhoto} boxSize='60px' objectFit='cover' alt='Profile' borderRadius='full' />
                                </Box>
                                <Box>
                                    <Box>{credentials.userFullname}</Box>
                                    <Box>{credentials.username}</Box>
                                </Box>
                            </Flex>
                            {user.globalUsername === credentials.username &&
                                <Flex as={Link} to='/user/editprofile' state={{ previousLocation }} alignItems='center' cursor='pointer'>
                                    <Icon as={Pencil} />
                                </Flex>
                            }
                        </Flex>

                        <Tabs size='lg' mt={4}>
                            <TabList p={0}>
                                {tabHead.map((value, index) => (
                                    <Tab
                                        key={index}
                                        p='5px 0 5px 0' w='33.33%'
                                        _selected={{ color: '#5B00FF', borderColor: '#5B00FF' }}
                                        fontSize={20}
                                    >
                                        <Icon as={value} />
                                    </Tab>
                                ))}
                            </TabList>

                            <TabPanels py={1}>
                                <TabPanel p='5px 0'>
                                    {/* Collaborator */}
                                    <Collaborator props={{ username: credentials.username }} />

                                </TabPanel>
                                <TabPanel p={0}>
                                    <p>two!</p>
                                </TabPanel>
                                <TabPanel p={0}>
                                    <p>three!</p>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>

                    </Box>


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

export default Profile
