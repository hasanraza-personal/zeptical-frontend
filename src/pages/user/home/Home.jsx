import { Box, Flex, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import './home.css';
import Sidebar from '../../../components/sidebar/Sidebar';
import RightSidebar from '../../../components/rightSidebar/RightSidebar';

const Home = () => {
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
                    <Box className='page_title'>Home</Box>
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

export default Home
