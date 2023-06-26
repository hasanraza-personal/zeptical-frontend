import { Box, Button, Container, Flex, useDisclosure, useMediaQuery, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import SelectInput from '../../../../../../../components/inputFields/selectInput/SelectInput';
import { v4 as uuidv4 } from 'uuid';
import SystemLoader from '../../../../../../../components/loader/systemLoader/SystemLoader';

const EditPaymentPreference = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const id = uuidv4();
    const [loading, setLoading] = useState(false);
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const [loadCompleted, setLoadCompleted] = useState(false);
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
            label: "Money and Stake Both",
            value: "Money and Stake Both"
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

        try {
            let response = await axios({
                method: 'POST',
                url: '/api/user/collaborator/updatepaymentpreference',
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
                toast({
                    position: 'top',
                    title: response.data.msg,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                navigate(-1)
            }, 1000)
        } catch (error) {
            setLoading(false)
            toast({
                position: 'top',
                title: error.response.data.msg,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    }

    const fetchPaymentPreference = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: `/api/user/collaborator/getcollaborator`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            const data = response.data.result;
            if (data.collaborator.paymentPreference) {
                setCredentials({
                    paymentPreference: data.collaborator.paymentPreference,
                })
            }
            setLoadCompleted(true);
        } catch (error) {
            toast({
                position: 'top',
                title: error.response.data.msg,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    }

    useEffect(() => {
        fetchPaymentPreference();
    }, [])

    if (loadCompleted) {
        return (
            <>
                <Box mt={4} px={4} py={!mobileScreen && 4} boxShadow={!mobileScreen && 'xs'}>
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
                        <Button
                            type='submit'
                            mt={4}
                            w='100%'
                            className='zeptical-red-fill-button'
                            isLoading={loading}
                            loadingText='Applying'
                        >
                            Update
                        </Button>
                    </form>
                </Box>
            </>
        )
    } else {
        return (
            <Container maxW='xl' p='0' pb={20}>
                <SystemLoader />
            </Container>
        )
    }
}

export default EditPaymentPreference
