import React, { useEffect, useState } from 'react'
import Information1 from './components/view/Information1'
import axios from 'axios';
import { Box, useMediaQuery, useToast } from '@chakra-ui/react';
import ViewLocation from './components/view/ViewLocation';
import ViewEducation from './components/view/ViewEducation';

const Collaborator = () => {
    const [userData, setUserData] = useState({});
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    console.log('userData: ', userData);
    const toast = useToast();

    const fetchUser = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: '/api/user/profile/getuserprofile',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            setUserData(response.data.user);
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
        fetchUser();
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Information1 />

            <ViewLocation userLocation={userData.location} />

            <ViewEducation userEducation={userData.education} />
        </>
    )
}

export default Collaborator
