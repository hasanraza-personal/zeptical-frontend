import { Box, Flex, Icon, Image, useDisclosure, useMediaQuery } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import LazyLoad from 'react-lazy-load';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../public/images/logo.png';
import TopNavbar from '../topNavbar/TopNavbar';
import { List } from 'react-bootstrap-icons';
import styles from './header.module.css';
import SideDrawer from '../drawer/sideDrawer/SideDrawer';
import TopMobileNavbar from '../topMobileNavbar/TopMobileNavbar';
import { useSelector } from 'react-redux';

const Header = () => {
    const [user, setUser] = useState(false);
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const { isOpen: isSideDrawerOpen, onOpen: openSideDrawer, onClose: closeSideDrawer } = useDisclosure();
    const location = useLocation();
    // console.log('location: ', location.pathname);
    const globalUser = useSelector((state) => state.user.value);

    let currentLocation = [
        "/",
        "/login",
        "/signup",
        "/user/forgotpassword",
        "/user/resetpassword",
        "/information"
    ]

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setUser(true)
        } else {
            setUser(false)
        }
    }, [globalUser])

    return (
        <>
            {(currentLocation.includes(location.pathname) || (user && mobileScreen)) &&
                <Flex boxShadow='xs' h='50px' alignItems='center' p={4} justifyContent='space-between'>
                    <Flex as={Link} to='/'>
                        <Flex as={LazyLoad} alignItems='center'>
                            <Image src={Logo} alt='Logo' w={10} h={10} />
                        </Flex>
                        <Box fontFamily='GoodTimesRg' fontSize={30} color='#5B00FF' ml={1.5}>Zeptical</Box>
                    </Flex>

                    {!mobileScreen && !user ? <>
                        <TopNavbar />
                    </> : <>
                        <Flex gap={3}>
                            {user &&
                                // Message
                                <TopMobileNavbar />
                            }
                            <Icon as={List} className={styles.list_icon} onClick={openSideDrawer} />
                        </Flex>
                        <SideDrawer props={{
                            isSideDrawerOpen,
                            closeSideDrawer
                        }} />
                    </>}

                </Flex>
            }
        </>
    )
}

export default Header
