import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from '@chakra-ui/react'
import React from 'react'

const Alert = ({ props }) => {
    const cancelRef = React.useRef()
    
    return (
        <>
            <AlertDialog
                isOpen={props.isOpen}
                leastDestructiveRef={cancelRef}
                onClose={props.onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            {props.titleText}
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            {props.bodyText}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} isLoading={props.loading} onClick={props.onClose}>
                                {props.leftBtnText}
                            </Button>
                            <Button colorScheme='red' isLoading={props.loading} loadingText={props.loadingText} onClick={props.rightBtnFn} ml={3}>
                                {props.rightBtnText}
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default Alert
