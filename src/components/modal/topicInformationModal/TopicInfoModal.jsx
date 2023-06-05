import React, { useEffect, useState } from 'react';
import styles from './topicinfomodal.module.css'
import { Box, Flex, Icon, Image, Modal, ModalContent, ModalOverlay, useMediaQuery } from '@chakra-ui/react';
import { CuriosQuotes } from './CuriosQuotes';
import ReadInfoImage from '../../../public/images/undraw/read_info.svg';
import LazyLoad from 'react-lazy-load';
import { XLg } from 'react-bootstrap-icons';

const TopicInfoModal = ({ props }) => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const [curiosQuote, setCuriosQuote] = useState("");
    const [changeQuote, setChangeQuote] = useState(1);

    if (props.infoFetching) {
        setTimeout(() => {
            setChangeQuote(changeQuote + 1)
        }, 5000)
    }

    useEffect(() => {
        setCuriosQuote(CuriosQuotes[Math.floor(Math.random() * CuriosQuotes.length)])
    }, [changeQuote])

    return (
        <>
            <Modal closeOnOverlayClick={props.infoFetched ? true : false} isOpen={props.isOpen} onClose={props.onClose}>
                <ModalOverlay />
                <ModalContent mx={mobileScreen && 4}>
                    {props.infoFetched ? <>
                        <Box px={5} py={4} >
                            <Flex justifyContent='space-between'>
                                <Box fontFamily='var(--semiBold-font)'>What is {props.infoData.topicName} ?</Box>
                                <Icon as={XLg} onClick={props.onClose} />
                            </Flex>
                            <Flex as={LazyLoad} justifyContent='center'>
                                <Image src={ReadInfoImage} w={200} />
                            </Flex>
                            <Box mt={4}>{props.infoData.topicDesc}</Box>
                        </Box>
                    </> : <>
                        <Box px={5} py={7} >
                            <Flex alignItems='center' flexDirection='column'>
                                <div className={styles.typewriter}>
                                    <div className={styles.slide}><i></i></div>
                                    <div className={styles.paper}></div>
                                    <div className={styles.keyboard}></div>
                                </div>
                                <Box textAlign='center' mt={3} fontSize={17} lineHeight='normal'>
                                    Generating your topic
                                </Box>
                            </Flex>
                            <Box textAlign='center' mt={2} fontSize={17} lineHeight='normal'>
                                {curiosQuote}
                            </Box>
                        </Box>
                    </>}

                </ModalContent>
            </Modal>
        </>
    )
}

export default TopicInfoModal
