import { Box, Button, Divider, Drawer, DrawerContent, DrawerOverlay, Flex, Icon, Image } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import LazyLoad from 'react-lazy-load';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../../public/images/logo.png';
import styles from './sidedrawer.module.css';
import { SideDrawerItems } from './sideDrawerItems';
import { SideDrawerBottomItems } from './sideDrawerItems';

const SideDrawer = ({ props }) => {
    const btnRef = React.useRef();
    const [auth, setAuth] = useState(false);

    const hanldeCloseDrawer = () => {
        setTimeout(() => {
            props.closeSideDrawer();
        }, 100)
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setAuth(true);
        }
    }, [localStorage.getItem('token')])

    return (
        <>
            <Drawer
                isOpen={props.isSideDrawerOpen}
                placement='left'
                onClose={props.closeSideDrawer}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <Flex as={Link} to='/' className='avoid-focus' p='10px 15px'>
                        <Flex as={LazyLoad} alignItems='center'>
                            <Image src={Logo} alt='Logo' w={10} h={10} />
                        </Flex>
                        <Box fontFamily='GoodTimesRg' fontSize={30} color='#5B00FF' ml={1.5}>Zeptical</Box>
                    </Flex>

                    {auth &&
                        <>
                            <NavLink
                                to='user/profile'
                                className={(navData) => navData.isActive ? styles.user_active : styles.user}
                            >
                                <Flex as={LazyLoad} alignItems='center'>
                                    <Image src='https://bit.ly/dan-abramov' className={styles.side_drawer_user_photo} alt='Profile photo' />
                                </Flex>
                                <Flex className={styles.side_drawer_user_text}>
                                    <Box className={styles.side_drawer_user_name}>Khan Hasan Raza</Box>
                                    <Box className={styles.side_drawer_user_username}>hkhan5242</Box>
                                </Flex>
                            </NavLink>

                            <Box className={styles.sidebar_drawer_top_border_container} />
                        </>
                    }


                    <Box className={styles.side_drawer_link}>
                        {SideDrawerItems.map((item, index) => (
                            (auth === item.auth || 'not required' === item.auth) &&
                            <NavLink
                                key={index}
                                to={item.url}
                                className={(navData) => navData.isActive ? styles.single_item_active : styles.single_item}
                                onClick={hanldeCloseDrawer}
                            >
                                <Icon as={item.icon} />
                                <Box className={styles.side_drawer_title}>{item.title}</Box>
                            </NavLink>
                        ))}
                    </Box>

                    <Box className={styles.sidebar_drawer_bottom_border_container} />

                    <Box className={styles.side_drawer_bottom_link}>
                        {SideDrawerBottomItems.map((item, index) => (
                            <NavLink
                                key={index}
                                to={item.url}
                                className={(navData) => navData.isActive ? styles.single_item_active : styles.single_item}
                            >
                                <Icon as={item.icon} />
                                <Box className={styles.side_drawer_title}>{item.title}</Box>
                            </NavLink>
                        ))}
                    </Box>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default SideDrawer
