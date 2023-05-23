import { Box, Button, Container, Flex, Icon, Image, VStack, useMediaQuery, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { ArrowLeft } from 'react-bootstrap-icons';
import LazyLoad from 'react-lazy-load';
import { useLocation, useNavigate } from 'react-router-dom';
import NotFoundImage from '../../../../../../../public/images/undraw/not_found.svg';
import axios from 'axios';
import TextInput from '../../../../../../../components/inputFields/textInput/TextInput';
// import TextArea from '../../../../../../../components/inputFields/textAreaInput/TextAreaInput';
import TextAreaInput from '../../../../../../../components/inputFields/textAreaInput/TextAreaInput';
import LinkInput from '../../../../../../../components/inputFields/linkInput/LinkInput';
import ProductPhotoInput from '../../../../../../../components/inputFields/productPhotoInput/ProductPhotoInput';

const EditProject = () => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const [loadCompleted, setLoadCompleted] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    let locationData = null;
    const [photo, setPhoto] = useState("");
    const [photoSelected, setPhotoSelected] = useState(false);
    const [credentials, setCredentials] = useState({
        projectId: "",
        name: "",
        description: "",
        projectLink: "",
        githubLink: "",
        photo: ""
    });
    console.log('credentials: ', credentials);

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (credentials.name.trim().length == 0) {
            toast({
                position: 'top',
                title: "Please provide your project name",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return
        }

        if (credentials.description.trim().length == 0) {
            toast({
                position: 'top',
                title: "Please provide your project description",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return
        }


        if (credentials.projectLink.trim().length == 0 && credentials.githubLink.trim().length == 0) {
            toast({
                position: 'top',
                title: "Please provide your project link or github link",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return
        }

        if (credentials.photo.length === 0) {
            toast({
                position: 'top',
                title: "Please provide your project photo",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return
        }
        setPhotoSelected(false);
        setLoading(true);

        const formData = new FormData();
        formData.append('projectId', credentials.projectId);
        formData.append('name', credentials.name);
        formData.append('description', credentials.description);
        formData.append('projectLink', credentials.projectLink);
        formData.append('githubLink', credentials.githubLink);
        formData.append('photo', credentials.photo);

        try {
            let response = await axios({
                method: 'POST',
                url: '/api/user/profile/updateproject',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                data: formData
            });

            setTimeout(() => {
                toast({
                    position: 'top',
                    title: response.data.msg,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                navigate(-1)
                setLoading(false);
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

    const fetchProject = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: `/api/user/profile/getproject`,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = response.data.result;
            if (data.project) {
                setCredentials({
                    projectId: "",
                    name: "",
                    description: "",
                    projectLink: "",
                    githubLink: "",
                    photo: ""
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

    const handleRemove = () => {
        setPhoto("");
        setPhotoSelected(false)
    }

    useEffect(() => {
        if (location.state) {
            locationData = location.state;
            if (locationData.projectId) {
                fetchProject();
            }
        }
        // eslint-disable-next-line
    }, [])

    if (!location.state) {
        return (
            <>
                <Container boxShadow={!mobileScreen && 'xs'} p={4} maxW='xl'>
                    <Flex as={LazyLoad} justifyContent='center'>
                        <Image src={NotFoundImage} w={200} />
                    </Flex>
                    <Flex justifyContent='center' mt={5} fontSize={18} color='var(--dark-grey-color)'>The page you are looking for does not exist.</Flex>
                </Container>
            </>
        )
    }


    return (
        <Container maxW='xl' p={0} pb={20}>
            <Box className='back-navigation-container' onClick={() => navigate(-1)} fontSize={mobileScreen ? '18px' : '22px'}>
                <Icon as={ArrowLeft} />
                <Box className='back-navigation-location'>Back</Box>
            </Box>

            <Box mt={4} px={4} py={!mobileScreen && 4} boxShadow={!mobileScreen && 'xs'}>
                <form onSubmit={handleSubmit}>

                    <VStack gap={0.5} mt={4}>
                        <TextInput props={{
                            isRequired: true,
                            label: "Project name",
                            placeholder: "Zeptical",
                            name: "name",
                            value: credentials.name,
                            onChange: onChange
                        }} />

                        <TextAreaInput props={{
                            isRequired: true,
                            label: "Project description",
                            placeholder: "A place where idea turns into Startup",
                            name: "description",
                            value: credentials.description,
                            onChange: onChange
                        }} />

                        <LinkInput props={{
                            isRequired: true,
                            label: "Project link",
                            placeholder: "https://zeptical.com",
                            name: "projectLink",
                            value: credentials.projectLink,
                            onChange: onChange
                        }} />

                        <LinkInput props={{
                            isRequired: true,
                            label: "Github link",
                            placeholder: "https://github.com/topics/image-upload",
                            name: "githubLink",
                            value: credentials.githubLink,
                            onChange: onChange
                        }} />

                        <ProductPhotoInput props={{
                            name: "photo",
                            value: credentials.photo,
                            credentials: credentials,
                            setCredentials: setCredentials,
                            photo: photo,
                            setPhoto: setPhoto,
                            setPhotoSelected: setPhotoSelected
                        }} />
                    </VStack>

                    {photoSelected && !loading &&
                        <Button mt={2} w='100%' size='sm' onClick={handleRemove}>Remove Selected Photo</Button>
                    }

                    <Button
                        type='submit'
                        className='zeptical-red-fill-button'
                        mt={5}
                        w='100%'
                        isLoading={loading}
                        loadingText='Updating'
                    >
                        Update
                    </Button>
                </form>
            </Box>
        </Container>
    )
}

export default EditProject
