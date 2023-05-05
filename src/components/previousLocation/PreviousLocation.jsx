import { Box, Icon } from '@chakra-ui/react'
import React from 'react'
import { ArrowLeft } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom';
import styles from './previouslocation.module.css';

const PreviousLocation = ({ props }) => {
    const navigate = useNavigate();

    return (
        <>
            <Box className={styles.container} onClick={() => navigate(-1)}>
                <Icon as={ArrowLeft} />
                <Box className={styles.location}>Back to {props.location}</Box>
            </Box>
        </>
    )
}

export default PreviousLocation
