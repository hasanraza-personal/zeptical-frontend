import { Box, Button, Flex, Image, Link } from '@chakra-ui/react';
import React from 'react';
import LazyLoad from 'react-lazy-load';
import errorImage from '../../../../../../public/images/undraw/error.svg';
import { useNavigate } from 'react-router-dom';

const CollaboratorError = () => {
    const navigate = useNavigate();
    return (
        <>
            <Flex as={LazyLoad} justifyContent='center' mt={8}>
                <Image src={errorImage} width={180} />
            </Flex>
            <Box lineHeight='normal' mt={4}>
                Please provide the above details in order to create your collaborator profile.
            </Box>
            <Button
                w='100%'
                mt={4}
                className='zeptical-original-empty-button'
                onClick={() => {
                    navigate(-1)
                }}
            >
                Go Back
            </Button>
        </>
    )
}

export default CollaboratorError
