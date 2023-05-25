import { Box, Flex, Modal, ModalContent, ModalOverlay, useMediaQuery } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import styles from './imageuploadloader.module.css';
import { Quotes } from './quotes';

const ImageUploadLoader = ({ props }) => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const [quote, setQuote] = useState("");
    const [changeQuote, setChangeQuote] = useState(1)

    if (props.imageUploader) {
        setTimeout(() => {
            setChangeQuote(changeQuote + 1)
        }, 5000)
    }

    useEffect(() => {
        setQuote(Quotes[Math.floor(Math.random() * Quotes.length)])
    }, [changeQuote])

    return (
        <>
            <Modal closeOnOverlayClick={false} isOpen={props.isOpen} onClose={props.onClose}>
                <ModalOverlay />
                <ModalContent mx={mobileScreen && 4}>
                    <Box px={5} py={7} >
                        <Flex justifyContent='center'>
                            <svg className={styles.svg} viewBox="25 25 50 50">
                                <circle className={styles.circle} r="20" cy="50" cx="50"></circle>
                            </svg>
                        </Flex>
                        <Box textAlign='center' mt={5} fontSize={17} lineHeight='normal'>
                            {quote}
                        </Box>
                    </Box>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ImageUploadLoader
