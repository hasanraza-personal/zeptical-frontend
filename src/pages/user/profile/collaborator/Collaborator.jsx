import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Container, useMediaQuery, useToast } from '@chakra-ui/react';
import ViewLocation from './components/view/ViewLocation';
import ViewEducation from './components/view/ViewEducation';
import ViewProject from './components/view/ViewProject';
import ViewSkill from './components/view/ViewSkill';
import ViewAchievement from './components/view/ViewAchievement';
import ViewInternship from './components/view/ViewInternship';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SystemLoader from '../../../../components/loader/systemLoader/SystemLoader';
import UserProfileInformation from './components/view/UserProfileInformation';
import CollaboratorOption from './components/view/CollaboratorOption';


const Collaborator = ({ ownerUsername }) => {
    // eslint-disable-next-line 
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const user = useSelector((state) => state.user.value);
    const [userData, setUserData] = useState({});
    const toast = useToast();
    const location = useLocation();
    const username = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
    const [loadCompleted, setLoadCompleted] = useState(false);

    const fetchUser = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: `/api/user/profile/getuserprofile/${username}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            setUserData(response.data.user);

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
        fetchUser();
        // eslint-disable-next-line
    }, [username])

    if (loadCompleted) {
        return (
            <>
                {user.globalUsername === ownerUsername &&
                    <UserProfileInformation />
                }

                <CollaboratorOption ownerUsername={ownerUsername} />

                <ViewLocation userData={userData.location} ownerUsername={ownerUsername} />

                <ViewEducation userData={userData.education} ownerUsername={ownerUsername} />

                <ViewSkill userSkill={userData.skill} ownerUsername={ownerUsername} />

                <ViewProject ownerUsername={ownerUsername} />

                <ViewAchievement ownerUsername={ownerUsername} />

                <ViewInternship ownerUsername={ownerUsername} />

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

export default Collaborator
