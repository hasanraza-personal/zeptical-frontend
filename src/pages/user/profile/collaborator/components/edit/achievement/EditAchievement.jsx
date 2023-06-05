import { Box, Button, Container, Flex, Icon, Image, VStack, useDisclosure, useMediaQuery, useToast } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { ArrowLeft } from 'react-bootstrap-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import TextInput from '../../../../../../../components/inputFields/textInput/TextInput';
import TextAreaInput from '../../../../../../../components/inputFields/textAreaInput/TextAreaInput';
import ProductPhotoInput from '../../../../../../../components/inputFields/productPhotoInput/ProductPhotoInput';
import SelectInput from '../../../../../../../components/inputFields/selectInput/SelectInput';
import ImageUploadLoader from '../../../../../../../components/loader/imageUploadLoader/ImageUploadLoader';
import axios from 'axios';
import NotFoundImage from '../../../../../../../public/images/undraw/not_found.svg';
import SystemLoader from '../../../../../../../components/loader/systemLoader/SystemLoader';
import LazyLoad from 'react-lazy-load';
import { rephraseSentence } from '../../../../../../../api/rephraseSentence';
import RephraseLoader from '../../../../../../../components/loader/rephraseLoader/RephraseLoader';

const EditAchievement = () => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const navigate = useNavigate();
    const location = useLocation();
    const [photo, setPhoto] = useState("");
    const [photoSelected, setPhotoSelected] = useState(false);
    const photoRef = useRef("");
    const locationRef = useRef("");
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const [imageUploader, setImageUploader] = useState(false);
    const [loadCompleted, setLoadCompleted] = useState(false);
    const { isOpen: isImageUploader, onOpen: openImageUploader, onClose: closeImageUploader } = useDisclosure();
    const { isOpen: isRephraseLoader, onOpen: openRephraseLoader, onClose: closeRephraseLoader } = useDisclosure();
    const [credentials, setCredentials] = useState({
        achievementId: "",
        name: "",
        level: "",
        description: "",
        certificate: ""
    })
    const options = [
        {
            label: "Intra Level",
            value: "Intra Level"
        },
        {
            label: "Inter Level",
            value: "Inter Level"
        },
        {
            label: "State Level",
            value: "State Level"
        },
        {
            label: "National Level",
            value: "National Level"
        },
        {
            label: "International Level",
            value: "International Level"
        },
    ]

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (credentials.name.trim().length === 0) {
            toast({
                position: 'top',
                title: "Please provide your competition name",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return
        }

        if (credentials.level.trim().length === 0) {
            toast({
                position: 'top',
                title: "Please provide your project level",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return
        }

        if (credentials.description.trim().length === 0) {
            toast({
                position: 'top',
                title: "Please provide your competition description",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return
        }

        if (credentials.certificate === 0) {
            toast({
                position: 'top',
                title: "Please provide your competition certificate",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return
        }
        let isImage = false;
        setPhotoSelected(false);
        setLoading(true);

        if (typeof credentials.certificate === 'object') {
            setImageUploader(true);
            openImageUploader();
            isImage = true;
        }

        const formData = new FormData();
        formData.append('achievementId', credentials.achievementId);
        formData.append('name', credentials.name);
        formData.append('level', credentials.level);
        formData.append('description', credentials.description);
        formData.append('certificate', credentials.certificate);

        try {
            let response = await axios({
                method: 'POST',
                url: '/api/user/profile/updateachievement',
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
            setPhotoSelected(false);
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

    const fetchAchievement = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: `/api/user/profile/getachievement/${locationRef.current.achievementId}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            const data = response.data.result[0];
            if (data) {
                setCredentials({
                    achievementId: data._id,
                    name: data.name,
                    level: data.level,
                    description: data.description,
                    certificate: data.certificate
                });
                setPhoto(data.certificate);
                photoRef.current = data.certificate;
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
            if (locationRef.current.achievementId) {
                fetchAchievement();
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

                            <VStack gap={0.5} mt={4}>
                                <TextInput props={{
                                    isRequired: true,
                                    label: "Competition name",
                                    placeholder: "Hackaton",
                                    name: "name",
                                    value: credentials.name,
                                    onChange: onChange
                                }} />

                                <SelectInput
                                    props={{
                                        isRequired: true,
                                        label: "Competition level",
                                        placeholder: "Select Competition Level",
                                        name: "level",
                                        value: credentials.level,
                                        onChange: onChange,
                                        options: options
                                    }}
                                />

                                <TextAreaInput props={{
                                    isRequired: true,
                                    label: "Competition description",
                                    placeholder: "A lot of thins to learn",
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

                                <ProductPhotoInput props={{
                                    isRequired: true,
                                    label: "Achievement certificate",
                                    name: "certificate",
                                    value: credentials.certificate,
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

export default EditAchievement
