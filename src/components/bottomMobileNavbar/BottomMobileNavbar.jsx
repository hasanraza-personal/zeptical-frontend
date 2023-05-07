import React from 'react';
import { BottomMobileNavbarItems } from './bottomMobileNavbarItems';
import { Box, Flex, Icon } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import styles from './bottommobilenavbar.module.css';

const BottomMobileNavbar = () => {
    return (
        <>
            <Box className={styles.bottom_navbar_container} boxShadow='xs'>
                {BottomMobileNavbarItems.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.url}
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
