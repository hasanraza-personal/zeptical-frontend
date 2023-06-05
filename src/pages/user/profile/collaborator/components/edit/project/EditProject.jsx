import { Box, Button, Container, Flex, Icon, Image, Stack, useDisclosure, useMediaQuery, useToast } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Link45deg } from 'react-bootstrap-icons';
import LazyLoad from 'react-lazy-load';
import { useLocation, useNavigate } from 'react-router-dom';
import NotFoundImage from '../../../../../../../public/images/undraw/not_found.svg';
import axios from 'axios';
import TextInput from '../../../../../../../components/inputFields/textInput/TextInput';
import TextAreaInput from '../../../../../../../components/inputFields/textAreaInput/TextAreaInput';
import ProductPhotoInput from '../../../../../../../components/inputFields/productPhotoInput/ProductPhotoInput';
import SystemLoader from '../../../../../../../components/loader/systemLoader/SystemLoader';
import ImageUploadLoader from '../../../../../../../components/loader/imageUploadLoader/ImageUploadLoader';
import { rephraseSentence } from '../../../../../../../api/rephraseSentence';
import RephraseLoader from '../../../../../../../components/loader/rephraseLoader/RephraseLoader';
import LeftIconTextInput from '../../../../../../../components/iconInputFields/leftIconTextInput/LeftIconTextInput';

const EditProject = () => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const [loadCompleted, setLoadCompleted] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [photo, setPhoto] = useState("");
    const [photoSelected, setPhotoSelected] = useState(false);
    const photoRef = useRef("");
    const locationRef = useRef("");
    const [imageUploader, setImageUploader] = useState(false);
    const { isOpen: isImageUploader, onOpen: openImageUploader, onClose: closeImageUploader } = useDisclosure();
    const { isOpen: isRephraseLoader, onOpen: openRephraseLoader, onClose: closeRephraseLoader } = useDisclosure();
    const [credentials, setCredentials] = useState({
        projectId: "",
        name: "",
        description: "",
        projectLink: "",
        githubLink: "",
        photo: ""
    });

    const validateURL = (url) => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (credentials.name.trim().length === 0) {
            toast({
                position: 'top',
                title: "Please provide your project name",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return
        }

        if (credentials.description.trim().length === 0) {
            toast({
                position: 'top',
                title: "Please provide your project description",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return
        }


        if (credentials.projectLink.trim().length === 0 && credentials.githubLink.trim().length === 0) {
            toast({
                position: 'top',
                title: "Please provide your project link or github link",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return
        }

        if (credentials.projectLink.trim().length !== 0) {
            const result = validateURL(credentials.projectLink)

            if (!result) {
                toast({
                    position: 'top',
                    title: "Please provide a valid project link",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                return
            }
        }

        if (credentials.githubLink.trim().length !== 0) {
            const result = validateURL(credentials.githubLink)

            if (!result) {
                toast({
                    position: 'top',
                    title: "Please provide a valid github link",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                return
            }
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
        let isImage = false;
        setPhotoSelected(false);
        setLoading(true);

        if (typeof credentials.photo === 'object') {
            setImageUploader(true)
            openImageUploader();
            isImage = true;
        }

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
                setImageUploader(false);
                toast({
                    position: 'top',
                    title: response.data.msg,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                navigate(-1)
                setLoading(false);
                closeImageUploader();
            }, isImage ? 5000 : 1000)
        } catch (error) {
            setPhotoSelected(true);
            setImageUploader(false);
            closeImageUploader();
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

    const fetchProject = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: `/api/user/profile/getproject/${locationRef.current.projectId}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            const data = response.data.result[0];
            if (data) {
                setCredentials({
                    projectId: data._id,
                    name: data.name,
                    description: data.description,
                    projectLink: data.projectLink,
                    githubLink: data.githubLink,
                    photo: data.photo
                });
                setPhoto(data.photo);
                photoRef.current = data.photo;
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

        if (photoRef.current.length !== 0) {
            setPhoto(photoRef.current);
        }
    }

    const handleRephrase = async () => {
        if (credentials.description.length < 3) {
            toast({
                position: 'top',
                title: "In order to rephrase the above sentence, your description must include atleast 200 characters.",
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return
        }
        setLoading(true)
        openRephraseLoader();

        const rephrasedSentence = await rephraseSentence(credentials.description);

        setTimeout(() => {
            setCredentials({ ...credentials, 'description': rephrasedSentence.data });
            closeRephraseLoader();
            setLoading(false);
        }, 5000)
    }

    useEffect(() => {
        if (location.state) {
            locationRef.current = location.state;
            if (locationRef.current.projectId) {
                fetchProject();
            } else {
                setLoadCompleted(true);
            }
        }
        // eslint-disable-next-line
    }, []);

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

    if (loadCompleted) {
        return (
            <>
                <ImageUploadLoader props={{
                    isOpen: isImageUploader,
                    onOpen: openImageUploader,
                    onClose: closeImageUploader,
                    imageUploader
                }} />

                <RephraseLoader props={{
                    isOpen: isRephraseLoader,
                    onOpen: openRephraseLoader,
                    onClose: closeRephraseLoader,
                }} />

                <Container maxW='xl' p={0} pb={20}>
                    <Box className='back-navigation-container' onClick={() => navigate(-1)} fontSize={mobileScreen ? '18px' : '22px'}>
                        <Icon as={ArrowLeft} />
                        <Box className='back-navigation-location'>Back</Box>
                    </Box>

                    <Box mt={4} px={4} py={!mobileScreen && 4} boxShadow={!mobileScreen && 'xs'}>
                        <form onSubmit={handleSubmit}>

                            <Stack gap={0.5} mt={4}>
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
                                <Flex justifyContent='end' w='100%'>
                                    <Button
                                        className='zeptical-original-fill-button'
                                        size='sm'
                                        onClick={handleRephrase}
                                        isLoading={loading}
                                        loadingText="Rephrasing"
                                    >
                                        Rephrase it!
                                    </Button>
                                </Flex>

                                <Box>
                                    <LeftIconTextInput props={{
                                        isRequired: false,
                                        label: "Project link",
                                        icon: Link45deg,
                                        placeholder: "https://www.zeptical.com",
                                        name: "projectLink",
                                        value: credentials.projectLink,
                                        onChange: onChange
                                    }} />
                                    <Box color='var(--dark-grey-color)' fontSize={14}>
                                        Ex. https://www.zeptical.com
                                    </Box>
                                </Box>

                                <Box>
                                    <LeftIconTextInput props={{
                                        isRequired: false,
                                        label: "Github link",
                                        icon: Link45deg,
                                        placeholder: "https://github.com/username/zeptical",
                                        name: "githubLink",
                                        value: credentials.githubLink,
                                        onChange: onChange
                                    }} />
                                    <Box color='var(--dark-grey-color)' fontSize={14}>
                                        Ex. https://github.com/username/zeptical
                                    </Box>
                                </Box>

                                <ProductPhotoInput props={{
                                    isRequired: true,
                                    label: "Project photo",
                                    name: "photo",
                                    value: credentials.photo,
                                    credentials: credentials,
                                    setCredentials: setCredentials,
                                    photo: photo,
                                    setPhoto: setPhoto,
                                    setPhotoSelected: setPhotoSelected
                                }} />
                            </Stack>

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

export default EditProject
