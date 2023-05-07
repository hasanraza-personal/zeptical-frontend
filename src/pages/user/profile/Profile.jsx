import { Box, Flex, useMediaQuery } from '@chakra-ui/react';
import React from 'react'
import RightSidebar from '../../../components/rightSidebar/RightSidebar';
import Sidebar from '../../../components/sidebar/Sidebar';
import './profile.css';

const Profile = () => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');

    return (
        <>
            <Flex className='container'>
                {!mobileScreen &&
                    <Box className='sidebar_parent_container'>
                        <Sidebar />
                    </Box>
                }

                <Box className='middle_container' w={mobileScreen ? '100%' : '50%'}>
                    <Box className='page_title'>Profile</Box>
                </Box>

                {!mobileScreen &&
                    <Box className='right_parent_container' w='25%'>
                        <RightSidebar />
                    </Box>
                }
            </Flex>
        </>
    )
}

export default Profile
