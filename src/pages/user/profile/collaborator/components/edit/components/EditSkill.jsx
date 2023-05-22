import { Container, useMediaQuery, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SystemLoader from '../../../../../../../components/loader/systemLoader/SystemLoader';
import MultiInputValues from '../../../../../../../components/inputFields/multiInputValues/MultiInputValues';

const EditSkill = () => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const [loadCompleted, setLoadCompleted] = useState(false);
    const [credentials, setCredentials] = useState({
        skill: [],
    });
    console.log('credentials: ', credentials);

    const onChange = (e) => {
        console.log('e: ', e);
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
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
            if (data.location) {
                setCredentials(data.user.skill)
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
                <MultiInputValues props={{
                    isRequired: true,
                    label: "Your skill",
                    placeholder: "Java",
                    name: "skill",
                    value: credentials.skill,
                    onChange: onChange
                }} />
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
