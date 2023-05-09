import React from 'react';
import { TopNavbarItems } from './topNavbarItems';
import { NavLink } from 'react-router-dom';
import { Box, Icon } from '@chakra-ui/react';
import styles from './topnavbar.module.css';

const TopNavbar = () => {
    return (
        <>
            <Box className={styles.top_navbar_container}>
                {TopNavbarItems.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.url}
                        className={(navData) => navData.isActive ? styles.single_item_active : styles.single_item}
                    >
                        <Icon as={item.icon} />
                        <Box className={styles.top_navbar_title}>{item.title}</Box>
                    </NavLink>
                ))}
            </Box>
        </>
    )
}

export default TopNavbar
