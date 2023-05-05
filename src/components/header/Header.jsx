import { Box, Flex, Icon, Image, useDisclosure, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import LazyLoad from 'react-lazy-load';
import { Link } from 'react-router-dom';
import Logo from '../../public/images/logo.png';
import TopNavbar from '../topNavbar/TopNavbar';
import { List } from 'react-bootstrap-icons';
import styles from './header.module.css';
import SideDrawer from '../drawer/sideDrawer/SideDrawer';

const Header = () => {
    const [mobileScreen] = useMediaQuery('(min-width: 850px)');
    const { isOpen: isSideDrawerOpen, onOpen: openSideDrawer, onClose: closeSideDrawer } = useDisclosure();

    return (
        <>
            <Flex boxShadow='xs' h='50px' alignItems='center' p={4} justifyContent='space-between'>
                <Flex as={Link} to='/'>
                    <Flex as={LazyLoad} alignItems='center'>
                        <Image src={Logo} alt='Logo' w={10} h={10} />
                    </Flex>
                    <Box fontFamily='GoodTimesRg' fontSize={30} color='#5B00FF' ml={1.5}>Zeptical</Box>
                </Flex>

                {mobileScreen ? <>
                    <TopNavbar />
                </> : <>
                    <Icon as={List} className={styles.list_icon} onClick={openSideDrawer} />
                    <SideDrawer props={{
                        isSideDrawerOpen,
                        closeSideDrawer
                    }} />
                </>}

            </Flex>
        </>
    )
}

export default Header
