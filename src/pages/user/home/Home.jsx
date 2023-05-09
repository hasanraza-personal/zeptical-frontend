import { Box, Flex, useMediaQuery } from '@chakra-ui/react';
import React, { useState } from 'react';
import './home.css';
import Sidebar from '../../../components/sidebar/Sidebar';
import RightSidebar from '../../../components/rightSidebar/RightSidebar';
import SystemLoader from '../../../components/loader/systemLoader/SystemLoader';

const Home = () => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const [load, setLoad] = useState(false);

    setTimeout(() => {
        setLoad(true)
    }, 500);

    if (load) {
        return (
            <>
                <Flex className='_container'>
                    {!mobileScreen &&
                        <Box className='sidebar_parent_container'>
                            <Sidebar />
                        </Box>
                    }

                    <Box className='middle_container' w={mobileScreen ? '100%' : '50%'}>
                        {!mobileScreen &&
                            <Box className='_page_title'>Home</Box>
                        }
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

export default Home
