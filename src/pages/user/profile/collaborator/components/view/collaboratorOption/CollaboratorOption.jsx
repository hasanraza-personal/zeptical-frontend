import React from 'react';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Alert, AlertIcon, Box, Flex } from '@chakra-ui/react';
import CollaboratorInformation from './components/CollaboratorInformation';
import { useSelector } from 'react-redux';
import CollaboratorSettings from './components/CollaboratorSettings';
import RegisterCollaborator from './components/RegisterCollaborator';

const CollaboratorOption = ({ props }) => {
    const user = useSelector((state) => state.user.value);

    return (
        <>
            <Box mt={4}>
                {props.collaboratorApplied ? <>
                    <Alert status='success' borderRadius={5} p='8px 12px' fontFamily='var(--semiBold-font)'>
                        <AlertIcon />
                        {props.ownerUsername === user.globalUsername ? <>
                            You are registered as Collaborator!
                        </> : <>
                            This user is registered as Collaborator!
                        </>}
                    </Alert>
                </> : <>
                    <Alert status='info' borderRadius={5} p='8px 12px' fontFamily='var(--semiBold-font)'>
                        <AlertIcon />
                        {props.ownerUsername === user.globalUsername ? <>
                            You are not registered as Collaborator!
                        </> : <>
                            This user is not registered as Collaborator!
                        </>}
                    </Alert>
                </>}
            </Box>

            {props.ownerUsername === user.globalUsername &&
                <Accordion allowToggle mt={2}>
                    <AccordionItem className='accordion_container'>
                        <h2>
                            <AccordionButton as={Flex} w='100%' justifyContent='space-between'>
                                <Box className='accordian_title'>
                                    {props.collaboratorApplied ? "Collaborator settings" : "Apply for collaborator"}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <Box>
                                <CollaboratorInformation />

                                {props.collaboratorApplied ? <>
                                    <CollaboratorSettings props={props} />
                                </> : <>
                                    <RegisterCollaborator />
                                </>}

                            </Box>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            }
        </>
    )
}

export default CollaboratorOption
