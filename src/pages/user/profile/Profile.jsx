import { Box, Container, Flex, Icon, Image, useMediaQuery } from '@chakra-ui/react';
import React, { useState } from 'react'
import RightSidebar from '../../../components/rightSidebar/RightSidebar';
import Sidebar from '../../../components/sidebar/Sidebar';
import './profile.css';
import SystemLoader from '../../../components/loader/systemLoader/SystemLoader';
// import { Helmet } from 'react-helmet-async';
import LazyLoad from 'react-lazy-load';
import { useSelector } from 'react-redux';
import { Pencil } from 'react-bootstrap-icons';

const Profile = () => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const [load, setLoad] = useState(false);
    const user = useSelector((state) => state.user.value);
    console.log('user: ', user);

    setTimeout(() => {
        setLoad(true)
    }, 500);

    if (load) {
        return (
            <>
                {/* <Helmet>
                    <title>Zeptical - Profile</title>
                    <meta name="description" content="Create an account or log into Zeptical." />
                    <link rel='canonical' href='https://zeptical.com/login' />
                    <meta name="keywords" content="Startup, Mentor, Investor, Collaborator, Social, Business, Idea, Product, Courage, Consistence, Hard Work, Motivation, Team, Friends, Social, Achievement" />
                </Helmet> */}

                <Flex className='_container'>
                    {!mobileScreen &&
                        <Box className='sidebar_parent_container'>
                            <Sidebar />
                        </Box>
                    }

                    <Box className='middle_container' w={mobileScreen ? '100%' : '50%'}>
                        {!mobileScreen &&
                            <Box className='_page_title'>Profile</Box>
                        }

                        <Container className='container' maxW='2xl' boxShadow={!mobileScreen && 'xs'} mt={!mobileScreen && 5}>
                            <Flex alignItems='center' justifyContent='space-between'>
                                <Flex alignItems='center' gap={2}>
                                    <Flex as={LazyLoad}>
                                        <Image src={user.globalUserPhoto} w={70} />
                                    </Flex>
                                    <Flex flexDirection='column'>
                                        <Box>{user.globalUserFullname}</Box>
                                        <Box>{user.globalUsername}</Box>
                                    </Flex>
                                </Flex>
                                <Icon as={Pencil} />
                            </Flex>
                        </Container>
                    </Box>

                    {!mobileScreen &&
                        <Box className='right_parent_container' w='25%'>
                            <RightSidebar />
                        </Box>
                    }
                </Flex>
            </>
        )
    } else {
        return (
            <SystemLoader />
        )
    }
}

export default Profile
