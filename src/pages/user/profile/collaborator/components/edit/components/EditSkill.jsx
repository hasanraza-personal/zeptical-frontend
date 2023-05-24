import { Box, Button, Container, useMediaQuery, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SystemLoader from '../../../../../../../components/loader/systemLoader/SystemLoader';
import MultiInputValues from '../../../../../../../components/inputFields/multiInputValues/MultiInputValues';
import { useNavigate } from 'react-router-dom';

const EditSkill = () => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const [loadCompleted, setLoadCompleted] = useState(false);
    const [credentials, setCredentials] = useState({
        skill: [],
    });

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        if (typeof credentials.skill === "string" && credentials.skill.length !== 0) {
            toast({
                position: 'top',
                title: "Please click on add button before updating your skill",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return
        }

        if (credentials.skill.length === 0) {
            toast({
                position: 'top',
                title: "Please provide your skill",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return
        }
        setLoading(true);

        try {
            let response = await axios({
                method: 'POST',
                url: '/api/user/profile/updateskill',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                data: { skill: credentials.skill }
            });

            setTimeout(() => {
                setLoading(false);
                navigate(-1)
                toast({
                    position: 'top',
                    title: response.data.msg,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            }, 1000)
        } catch (error) {
            setLoading(false);
            toast({
                position: 'top',
                title: error.response.data.msg,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    }

    const fetchUserSkill = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: `/api/user/profile/getuserskill`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            const data = response.data.user;
            if (data.skill) {
                setCredentials({ skill: data.skill })
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
        fetchUserSkill();
        // eslint-disable-next-line
    }, []);

    if (loadCompleted) {
        return (
            <>
                <Box mt={4} px={4} py={!mobileScreen && 4} boxShadow={!mobileScreen && 'xs'}>
                    <MultiInputValues props={{
                        isRequired: true,
                        label: "Your skill",
                        placeholder: "Java",
                        name: "skill",
                        value: credentials.skill,
                        onChange: onChange
                    }} />

                    <Button
                        type='submit'
                        className='zeptical-red-fill-button'
                        mt={5}
                        w='100%'
                        isLoading={loading}
                        loadingText='Updating'
                        onClick={handleSubmit}
                    >
                        Update
                    </Button>
                </Box >
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

export default EditSkill
