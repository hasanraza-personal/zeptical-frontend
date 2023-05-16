import { Flex } from '@chakra-ui/react';
import React from 'react';
import styles from './systemloader.module.css';

const SystemLoader = () => {
    return (
        <>
            <Flex justifyContent='center' margin='auto' mt={20}>
                <span className={styles.loader}></span>
            </Flex>
        </>
    )
}

export default SystemLoader
