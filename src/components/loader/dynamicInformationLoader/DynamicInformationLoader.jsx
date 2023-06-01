import React from 'react';
import { CuriosQuotes } from './curiosQuotes';
import styles from './dynamicinformationloader.module.css';
import { Box, Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';

const DynamicInformationLoader = ({ props }) => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const [quote, setQuote] = useState("");
    const [changeQuote, setChangeQuote] = useState(1)

    return (
        <>
            <Modal closeOnOverlayClick={false} isOpen={props.isOpen} onClose={props.onClose}>
                <ModalOverlay />
                <ModalContent mx={mobileScreen && 4}>
                    <Box px={5} py={7} >
                        <Flex justifyContent='center'>
                            <div className={styles.typewriter}>
                                <div className={styles.slide}><i></i></div>
                                <div className={styles.paper}></div>
                                <div className={styles.keyboard}></div>
                            </div>
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

export default DynamicInformationLoader
