import React from 'react';
import styles from './commonLoader.module.css';
import { Box, Flex, Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';

const CommonLoader = ({ props }) => {
    return (
        <>
            <Modal closeOnOverlayClick={false} isOpen={props.isOpen} onClose={props.onClose}>
                <ModalOverlay />
                <ModalContent py={7} mx={2}>
                    <Flex justifyContent='center'>
                        <svg className={styles.svg} viewBox="25 25 50 50">
                            <circle className={styles.circle} r="20" cy="50" cx="50"></circle>
                        </svg>
                    </Flex>
                    <Box textAlign='center' mt={5} fontSize={17} lineHeight='normal'>
                        {props.loadingMsg}
                    </Box>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CommonLoader
