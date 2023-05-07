import { Box, Flex, Image, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React from 'react';
import styles from './rightsidebar.module.css';
import { Search } from 'react-bootstrap-icons';
import comingSoonImage from '../../public/images/undraw/coming_soon.svg';
import LazyLoad from 'react-lazy-load';

const RightSidebar = () => {
    return (
        <>
            <Box className={styles.right_container} boxShadow='xs'>
                <Box p='10px 15px'>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<Search color='gray' />}
                        />
                        <Input type='text' placeholder='Search' />
                    </InputGroup>
                </Box>

                <Box>
                    <Flex as={LazyLoad} justifyContent='center' mt={20}>
                        <Image src={comingSoonImage} w={200} />
                    </Flex>
                    <Box mt={10}>
                        <Flex className={styles.coming_soon_title_1}>21 Days Challenge</Flex>
                        <Flex className={styles.coming_soon_title_2}>Coming Soon</Flex>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default RightSidebar
