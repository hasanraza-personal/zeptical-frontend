import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Flex, useDisclosure, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import SelectInput from '../../../../../../components/inputFields/selectInput/SelectInput';
import CommonLoader from '../../../../../../components/loader/commonLoader/CommonLoader';

const CollaboratorForm = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const id = uuidv4();
    const [loading, setLoading] = useState(false);
    const { isOpen: isCommonLoaderOpen, onOpen: openCommonLoader, onClose: closeCommonLoader } = useDisclosure();

    const [credentials, setCredentials] = useState({
        paymentPreference: ""
    });

    const options = [
        {
            label: "Money",
            value: "Money"
        },
        {
            label: "Stake",
            value: "Stake"
        },
        {
            label: "Money and Stake both",
            value: "both"
        }
    ]

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (credentials.paymentPreference.trim().length === 0) {
            if (!toast.isActive(id)) {
                toast({
                    id,
                    position: 'top',
                    title: "Please select your payment preference",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
            return;
        }
        setLoading(true);
        openCommonLoader();

        try {
            let response = await axios({
                method: 'POST',
                url: '/api/user/collaborator/createcollaborator',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                data: {
                    paymentPreference: credentials.paymentPreference,
                }
            });

            setTimeout(() => {
                setLoading(false);
                closeCommonLoader();
                toast({
                    title: "Congratulations",
                    variant: "left-accent",
                    description: response.data.msg,
                    position: 'top',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
                navigate(-1);
            }, 5000)

        } catch (error) {
            setLoading(false)
            closeCommonLoader();
            toast({
                position: 'top',
                title: error.response.data.msg,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    }

    return (
        <>
            <CommonLoader props={{
                isOpen: isCommonLoaderOpen,
                onClose: closeCommonLoader,
                loadingMsg: "Registering you as a collaborator"
            }} />

            <Box mt={5}>
                <Alert status='info' p='8px 12px' lineHeight='normal' borderRadius={5}>
                    <Flex>
                        <AlertIcon />
                        <Box>
                            <AlertTitle>Title</AlertTitle>
                            <AlertDescription>Description</AlertDescription>
                        </Box>
                    </Flex>
                </Alert>

                <Box mt={2}>
                    <form onSubmit={handleSubmit}>
                        <SelectInput
                            props={{
                                isRequired: true,
                                label: "What are your expectations when collaborating with a startup?",
                                placeholder: "Select Payment Preference",
                                name: "paymentPreference",
                                value: credentials.paymentPreference,
                                onChange: onChange,
                                options: options
                            }}
                        />
                        <Flex w='100%' gap={2} mt={4}>
                            <Button
                                w='50%'
                                onClick={() => {
                                    navigate(-1)
                                }}>
                                Cancel
                            </Button>
                            <Button
                                type='submit'
                                w='50%'
                                className='zeptical-red-fill-button'
                                isLoading={loading}
                                loadingText='Applying'
                            >
                                Apply
                            </Button>
                        </Flex>
                    </form>
                </Box>
            </Box>
        </>
    )
}

export default CollaboratorForm
