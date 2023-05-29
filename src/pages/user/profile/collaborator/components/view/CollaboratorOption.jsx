import React from 'react';
import LazyLoad from 'react-lazy-load';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Alert, AlertIcon, Box, Button, Flex, Image, useMediaQuery } from '@chakra-ui/react';
import CollaboratorInformation from './CollaboratorInformation';
import notFoundImage from '../../../../../../public/images/undraw/not_found.svg';
import { useSelector } from 'react-redux';


const CollaboratorOption = ({ ownerUsername }) => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const user = useSelector((state) => state.user.value);

    return (
        <>
            <Box mt={4}>
                <Alert status='info' borderRadius={5} p='8px 12px' fontFamily='var(--semiBold-font)'>
                    <AlertIcon />
                    {ownerUsername === user.globalUsername ? <>
                        You are not registered as Collaborator!
                    </> : <>
                        This user is not registered as Collaborator!
                    </>}

                </Alert>
            </Box>

            {ownerUsername === user.globalUsername &&
                <Accordion allowToggle mt={2}>
                    <AccordionItem className='accordion_container'>
                        <h2>
                            <AccordionButton as={Flex} w='100%' justifyContent='space-between'>
                                <Box className='accordian_title'>
                                    Apply for collaborator
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <Box>
                                <CollaboratorInformation />
                                <Flex as={LazyLoad} justifyContent='center' my={6}>
                                    {/* <Image src={collaboratorImage} w={200} /> */}
                                    <Image src={notFoundImage} w={mobileScreen ? 150 : 180} />
                                </Flex>
                                <Button className='zeptical-red-empty-button' size='sm' w='100%'>
                                    Apply For Collaborator
                                </Button>
                            </Box>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            }
        </>
    )
}

export default CollaboratorOption
