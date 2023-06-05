import React from 'react';
import styles from './rephraseloader.module.css';
import { Box, Flex, Modal, ModalContent, ModalOverlay, useMediaQuery } from '@chakra-ui/react';

const RephraseLoader = ({ props }) => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');

    return (
        <>
            <Modal closeOnOverlayClick={false} isOpen={props.isOpen} onClose={props.onClose}>
                <ModalOverlay />
                <ModalContent mx={mobileScreen && 4}>
                    <Box px={5} py={7} >
                        <Flex alignItems='center' flexDirection='column'>
                            <div className={styles.typewriter}>
                                <div className={styles.slide}><i></i></div>
                                <div className={styles.paper}></div>
                                <div className={styles.keyboard}></div>
                            </div>
                            <Box textAlign='center' mt={3} fontSize={17} lineHeight='normal'>
                                Rephrasing your sentence. Please be patience.
                            </Box>
                        </Flex>
                    </Box>
                </ModalContent>
            </Modal>
        </>
    )
}

export default RephraseLoader
