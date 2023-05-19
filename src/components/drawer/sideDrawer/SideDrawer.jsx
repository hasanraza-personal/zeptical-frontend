import { Badge, Box, Drawer, DrawerContent, DrawerOverlay, Flex, Icon, Image } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import LazyLoad from 'react-lazy-load';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from '../../../public/images/logo.png';
import styles from './sidedrawer.module.css';
import { SideDrawerItems } from './sideDrawerItems';
import { BoxArrowRight } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../slice/UserSlice';
// import { SideDrawerBottomItems } from './sideDrawerItems';

const SideDrawer = ({ props }) => {
    const btnRef = React.useRef();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();
    const [isUser, setIsUser] = useState(null);

    const hanldeCloseDrawer = () => {
        setTimeout(() => {
            props.closeSideDrawer();
        }, 100)
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch(logout({}))

        navigate('/login');

        setTimeout(() => {
            props.closeSideDrawer();
        }, 100)
    }

    useEffect(() => {
        if (user.globalUsername) {
            setIsUser(true);
        } else {
            setIsUser(false);
        }
    }, [user.globalUsername])

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

                    {isUser &&
                        <>
                            <NavLink
                                onClick={hanldeCloseDrawer}
                                to={`/user/${user.globalUsername}`}
                                className={(navData) => navData.isActive ? styles.user_active : styles.user}
                            >
                                <Flex as={LazyLoad} alignItems='center'>
                                    <Image src={user.globalUserPhoto} className={styles.side_drawer_user_photo} alt='Profile photo' />
                                </Flex>
                                <Flex className={styles.side_drawer_user_text}>
                                    <Box className={styles.side_drawer_user_name}>{user.globalUserFullname}</Box>
                                    <Box className={styles.side_drawer_user_username}>{user.globalUsername}</Box>
                                </Flex>
                            </NavLink>

                            <Box className={styles.sidebar_drawer_top_border_container} />
                        </>
                    }


                    <Box className={styles.side_drawer_link}>
                        {SideDrawerItems.map((item, index) => (
                            (isUser === item.auth || 'not required' === item.auth) &&
                            <NavLink
                                key={index}
                                to={item.url}
                                className={(navData) => navData.isActive ? styles.single_item_active : styles.single_item}
                                onClick={hanldeCloseDrawer}
                            >
                                <Icon as={item.icon} />
                                <Box className={styles.side_drawer_title}>{item.title}</Box>
                                {item.title === 'Notification' && <Badge colorScheme="green">4</Badge>}
                            </NavLink>
                        ))}

                        {isUser &&
                            <Flex className={styles.single_item} cursor='pointer' onClick={handleLogout}>
                                <Icon as={BoxArrowRight} />
                                <Box className={styles.side_drawer_title}>Logout</Box>
                            </Flex>
                        }
                    </Box>

                    {/* <Box className={styles.sidebar_drawer_bottom_border_container} />

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
                    </Box> */}
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default SideDrawer
