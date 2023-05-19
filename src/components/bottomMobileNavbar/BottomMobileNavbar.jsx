import React from 'react';
import { BottomMobileNavbarItems } from './bottomMobileNavbarItems';
import { Box, Icon } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import styles from './bottommobilenavbar.module.css';
import { useSelector } from 'react-redux';

const BottomMobileNavbar = () => {
    const user = useSelector((state) => state.user.value);

    return (
        <>
            <Box className={styles.bottom_navbar_container} boxShadow='xs'>
                {BottomMobileNavbarItems.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.url === 'username' ? `user/${user.globalUsername}` : item.url}
                        className={(navData) => navData.isActive ? styles.single_item_active : styles.single_item}
                    >
                        <Icon as={item.icon} />
                    </NavLink>
                ))}
            </Box>
        </>
    )
}

export default BottomMobileNavbar
