import { Flex, Image, Modal, ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/react';
import React from 'react';
import styles from './imagemodal.module.css';

const ImageModal = ({ props }) => {
    setTimeout(() => {
        props.setImageLoader(false);
    }, 1500)
    return (
        <>
            <Modal closeOnOverlayClick={!props.imageLoader} isOpen={props.isOpen} onClose={props.onClose}>
                <ModalOverlay />
                <ModalContent className={styles.container}>
                    {!props.imageLoader ? <>
                        <ModalCloseButton size='lg' />
                        <Image className={styles.image} src={props.image} />
                    </> : <>
                        <Flex className={styles.loader_container}>
                            <svg className={styles.svg} viewBox="25 25 50 50">
                                <circle className={styles.circle} r="20" cy="50" cx="50"></circle>
                            </svg>
                        </Flex>
                    </>}
                </ModalContent>
            </Modal>
        </>
    )
}

export default ImageModal
