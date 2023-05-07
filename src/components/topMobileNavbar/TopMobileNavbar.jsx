import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Icon } from '@chakra-ui/react';
import styles from './topmobilenavbar.module.css'
import { Envelope } from 'react-bootstrap-icons';


const TopMobileNavbar = () => {
    return (
        <>
            <NavLink
                to='/user/message'
                className={(navData) => navData.isActive ? styles.single_item_active : styles.single_item}
            >
                <Icon as={Envelope} className={styles.icon} />
                <span className={styles.icon_button__badge}>2</span>
            </NavLink>
        </>
    )
}

export default TopMobileNavbar
