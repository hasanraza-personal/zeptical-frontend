import { Badge, Box, Flex, Icon, Image } from '@chakra-ui/react';
import React from 'react';
import styles from './sidebar.module.css'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { SidebarNavItems } from './sidebarItems';
import LazyLoad from 'react-lazy-load';
import Logo from '../../public/images/logo.png';
import { BoxArrowRight } from 'react-bootstrap-icons';
import { logout } from '../../slice/UserSlice';
import { useDispatch, useSelector } from 'react-redux';

const Sidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);

    const handleLogout = () => {
        dispatch(logout({}))
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    }

    return (
        <>
            <Box className={styles.sidebar_container} boxShadow='base'>
                <Flex as={Link} to='/' className='avoid-focus' p='10px 15px'>
                    <Flex as={LazyLoad} alignItems='center'>
                        <Image src={Logo} alt='Logo' w={10} h={10} />
                    </Flex>
                    <Box fontFamily='GoodTimesRg' fontSize={30} color='#5B00FF' ml={1.5}>Zeptical</Box>
                </Flex>

                <NavLink
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

                <Box className={styles.sidebar_drawer_link}>
                    {SidebarNavItems.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.url}
                            className={(navData) => navData.isActive ? styles.single_item_active : styles.single_item}
                        >
                            <Icon as={item.icon} />
                            <Box className={styles.side_drawer_title}>{item.title}</Box>
                            {item.title === 'Notification' && <Badge colorScheme="green">4</Badge>}
                            {item.title === 'Message' && <Badge colorScheme="green">New</Badge>}
                        </NavLink>
                    ))}
                    <Flex className={styles.single_item} cursor='pointer' onClick={handleLogout}>
                        <Icon as={BoxArrowRight} />
                        <Box className={styles.side_drawer_title}>Logout</Box>
                    </Flex>
                </Box>
            </Box>
        </>
    )
}

export default Sidebar
