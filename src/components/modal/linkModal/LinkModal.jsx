import { Alert, AlertDescription, AlertIcon, Box, Button, Flex, Image, Modal, ModalContent, ModalOverlay } from '@chakra-ui/react'
import React from 'react'
import LazyLoad from 'react-lazy-load'
import { useNavigate } from 'react-router-dom'

const LinkModal = ({ props }) => {
    const navigate = useNavigate();
    return (
        <>
            <Modal isOpen={props.isOpen} onClose={props.onClose}>
                <ModalOverlay />
                <ModalContent p={4} mx={1}>
                    <Flex as={LazyLoad} justifyContent='center'>
                        <Image src={props.image} width={props.imgWidth} />
                    </Flex>
                    <Box textAlign='center' fontSize={24}>{props.title}</Box>
                    <Box>{props.desc}</Box>
                    {props.alertMessage.trim().length !== 0 && <>
                        <Alert status={props.alertStatus} borderRadius={5} my={3}>
                            <AlertIcon />
                            <Box>
                                <AlertDescription lineHeight='normal'>{props.alertMessage}</AlertDescription>
                            </Box>
                        </Alert>
                    </>}
                    <Flex w="100%" gap={2}>
                        <Button w="50%" onClick={props.onClose}>Cancel</Button>
                        <Button
                            props={props.urlPath}
                            w="50%"
                            className='zeptical-red-fill-button'
                            loadingText={props.loadingText}
                            isLoading={props.loading}
                            onClick={() => {
                                props.setLoading(true);
                                setTimeout(() => {
                                    props.setLoading(false);
                                    navigate(props.urlPath)
                                }, 1500)
                            }}
                        >
                            Continue
                        </Button>
                    </Flex>
                </ModalContent>
            </Modal>
        </>
    )
}

export default LinkModal
