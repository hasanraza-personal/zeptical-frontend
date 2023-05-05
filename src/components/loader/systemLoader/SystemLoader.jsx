import { Flex } from '@chakra-ui/react';
import React from 'react';
import './systemloader.css';

const SystemLoader = () => {
    return (
        <>
            <Flex justifyContent='center' mt={20}>
                <span className="loader"></span>
            </Flex>
        </>
    )
}

export default SystemLoader
