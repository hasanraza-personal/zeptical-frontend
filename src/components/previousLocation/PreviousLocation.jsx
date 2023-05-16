import { Box, Icon, useMediaQuery } from '@chakra-ui/react'
import React from 'react'
import { ArrowLeft } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom';
import styles from './previouslocation.module.css';

const PreviousLocation = ({ props }) => {
    const navigate = useNavigate();
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');

    return (
        <>
            <Box className={styles.container} onClick={() => navigate(-1)} fontSize={mobileScreen ? '18px' : '22px'}>
                <Icon as={ArrowLeft} />
                <Box className={styles.location}>Back to {props.location}</Box>
            </Box>
        </>
    )
}

export default PreviousLocation
